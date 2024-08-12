import { createMiddleware } from 'hono/factory'


class AllMiddlewares {   
    testMiddleware() {
        return createMiddleware(async (c, next) => {            
            console.log(`Hello Im Middleware`)
            await next()
        })
    }
}


export function ApplyMiddleware(middlewareFunction:  keyof  AllMiddlewares) {
    const instance = new AllMiddlewares()
    return instance[middlewareFunction]()
}
