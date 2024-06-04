import { Context } from 'hono'
import { createMiddleware } from 'hono/factory'
 
const API_KEY = '12345'
export class DefaultVariables {
    static setApiKey() {
        return createMiddleware(async (c: Context, next) => {
            c.set('API_KEY', API_KEY)
            await next()
        })
    }
}