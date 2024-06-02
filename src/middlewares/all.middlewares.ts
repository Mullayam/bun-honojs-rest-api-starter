import { createMiddleware } from 'hono/factory'

 
class AllMiddlewares {
    public testMiddleware() {
        return createMiddleware(async (c, next) => {
            console.log("InitMiddlewares")
            await next()
            c.res.headers.set('X-Message', 'Good morning!')
        })
    }
}


export function ApplyMiddleware(middlewareFunction: keyof AllMiddlewares) {
    const instance = new AllMiddlewares()
    return instance[middlewareFunction]()
}
