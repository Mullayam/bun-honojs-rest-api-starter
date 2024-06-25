import { logger } from 'hono/logger'
import { createFactory } from 'hono/factory'
import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

type Env = {
    Variables: {
        foo: string
    }
}
const factory = createFactory<Env>()
const handlers = factory.createHandlers(logger(), (c) => {
    return c.json(c.var.foo)
})
export class Handler {

    static AppLevel(err: Error, c: Context) {
        if (err instanceof HTTPException) {  
        
            return c.json({
                name:err.name|| "Internal Server Error",
                message: err.message,
                stack: {
                    code: err.status,
                    stack: err.stack,                    
                    path: c.req.path,
                    method: c.req.method
                }
            }, err.status)
        }
        return c.json({
            name:err.name|| "Internal Server Error",
            message: err.message,
            stack: {
                code: 500,               
                path: c.req.path,
                method: c.req.method
            }
        }, 500)
    }
    static UnhandledRoutes(c: Context) {
        return c.json({
            name: "NOT FOUND",
            message: "This Route does not exist",
            stack: {
                code: 404,
                info: "The requested resource could not be found",
                path: c.req.path,
                method: c.req.method
            }
        }, 404)
    }
}