import { cors } from 'hono/cors'
import { etag } from 'hono/etag'
import { csrf } from 'hono/csrf'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { CORSOptions, CSRFOptions, ETagOptions, PrettyOptions, SecureHeadersOptions } from '@/utils/interfaces/plugins'
export class Plugins {

    public static useLogger() {
        return logger()
     }
    static useCors(options?: CORSOptions) {
        return cors({ ...this.options(), ...options })
    }
    static useEtag(options?: ETagOptions) {
        return etag(options)
    }
    static useSecureHeaders(options?: SecureHeadersOptions) {
        return secureHeaders(options)
    }
    static usePrettyJsonPrint(options?: PrettyOptions) {
        return prettyJSON(options)
    }
    static useCSRF(options?: CSRFOptions) {
        return csrf(options)
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