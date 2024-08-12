import { Context } from 'hono'
import { createMiddleware } from 'hono/factory'
import { CONFIG } from '.'

export class DefaultVariables {
    /**
     * Sets the API key in the context and calls the next middleware.
     *
     * @return {Promise<void>} A promise that resolves when the middleware chain is complete.
     */
    static setApiKey() {
        return createMiddleware(async (c: Context, next) => {
            c.set('API_KEY', CONFIG.APP.API_KEY)
            await next()
        })
    }
}