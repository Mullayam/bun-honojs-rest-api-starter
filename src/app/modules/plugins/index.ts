import { Context } from 'hono'
import { cors } from 'hono/cors'
import { etag } from 'hono/etag'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'
import { getConnInfo } from 'hono/bun'
import { CONFIG } from '@/app/config'
import { bodyLimit } from 'hono/body-limit'
import { prettyJSON } from 'hono/pretty-json'
import { createMiddleware } from 'hono/factory'
import { rateLimiter } from "hono-rate-limiter";
import { secureHeaders } from 'hono/secure-headers'
import { ForbiddenException, PayloadTooLargeException } from '@/app/libs/error'
import { ipRestriction, IPRestrictionRules } from 'hono/ip-restriction'
import { CORSOptions, CSRFOptions, ETagOptions, PrettyOptions, SecureHeadersOptions } from '@/utils/interfaces/plugins'
export class Plugins {

    /**
     * Returns a middleware function that logs the incoming request and outgoing response.
     *
     * @return {Function} A middleware function that logs the incoming request and outgoing response.
     */
    public static useLogger() {
        return logger()
    }
    /**
     * A function that applies CORS settings to the request based on the provided options.
     *
     * @param {CORSOptions} options - Optional CORS configuration options.
     * @return {void} No specific return value.
     */
    static useCors(options?: CORSOptions) {
        return cors({ ...this.options(), ...options })
    }
    /**
     * Returns a middleware function that adds an ETag header to the response.
     *
     * @param {ETagOptions} [options] - Optional configuration options.
     * @return {Function} A middleware function that adds an ETag header to the response.
     */
    static useEtag(options?: ETagOptions) {
        return etag(options)
    }
    /**
     * A middleware function that sets secure headers for the response.
     *
     * @param {SecureHeadersOptions} options - Options for setting secure headers.
     * @return {Function} The function that sets secure headers.
     */
    static useSecureHeaders(options?: SecureHeadersOptions) {
        return secureHeaders(options)
    }
    /**
     * Returns a middleware function that pretty-prints the response body as JSON.
     *
     * @param {PrettyOptions} [options] - Optional configuration options.
     * @return {Function} The middleware function.
     */
    static usePrettyJsonPrint(options?: PrettyOptions) {
        return prettyJSON(options)
    }
    /**
     * A middleware function that applies CSRF protection based on the provided options.
     *
     * @param {CSRFOptions} options - Optional CSRF configuration options.
     * @return {Function} The CSRF protection middleware function.
     */
    static useCSRF(options?: CSRFOptions) {
        return csrf(options)
    }
    
    /**
     * A middleware function that intercepts file uploads and parses the request body.
     *
     * @return {Function} The middleware function that intercepts file uploads and parses the request body.
     */
    static useFileInterceptor() {
        return createMiddleware(async (c, next) => {
            await c.req.parseBody()
            await next()
        })
    }
    /**
     * A middleware function that sets a limit on the request body size.
     *
     * @param {Object} options - The options object for setting the body limit.
     * @param {number} options.maxSize - The maximum size of the request body allowed.
     * @param {(c: Context) => Response | Promise<Response>} [options.onError] - Optional error handler function.
     * @return {Function} The middleware function that limits the request body size.
     */
    static useBodyLimit(options?: {
        maxSize: number;
        onError?: (c: Context) => Response | Promise<Response>;
    }) {
        return bodyLimit({
            maxSize: 1024 * 1024,
            onError(c) {
                throw new PayloadTooLargeException()
            },
        })
    }
/**
 * Returns a middleware function that applies rate limiting to incoming requests.
 *
 * @return {Function} The rate limiting middleware function.
 */
    useLimiter() {
        return rateLimiter({
            windowMs: 15 * 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
            standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
            keyGenerator: (c) => "<unique_key>", // Method to generate custom identifiers for clients.
            // store: ... , // Redis, MemoryStore, etc. See  https://github.com/rhinobase/hono-rate-limiter
            // npm i @acpr/rate-limit-postgresql npm i typeorm-rate-limit-store npm i @hono-rate-limiter/redis npm i rate-limit-redis
        });
    }
    /**
     * A function that sets IP restrictions based on the provided options.
     *
     * @param {IPRestrictionRules} options - Optional rules for IP restriction.
     * @return {Function} The IP restriction middleware function.
     */
    static useIpRestriction(options?: IPRestrictionRules) {
        const denyList = options?.denyList || CONFIG.APP.BLACKLISTED_IP.split(',')
        const allowList = options?.allowList || CONFIG.APP.ALLOWED_IP.split(',')
        return ipRestriction(getConnInfo, {
            denyList,
            allowList,
        }, async (remote, c) => {
            throw new ForbiddenException(`Blocking access from ${remote.addr}`)
        })
    }
    /**
     * Returns the options for the function.
     *
     * @return {CorsOptions} The options object containing the origin, optionsSuccessStatus, and credentials properties.
     */
    private static options(): CORSOptions {
        return {
            origin: 'http://example.com',
            allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
            allowMethods: ['POST', 'GET', 'OPTIONS'],
            exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
            maxAge: 600,
            credentials: true,
        }
    }
}
const plugins = new Plugins()

export const Limiter = plugins.useLimiter()
