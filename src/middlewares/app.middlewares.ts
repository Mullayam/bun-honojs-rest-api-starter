import { ApplicationOptions } from '@/utils/interfaces/app'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

type Env = {
    Variables: {
        echo: (str: string) => string
    }
}
export class AppMiddlewares {
    static isApiProtected() {
        return createMiddleware<ApplicationOptions>(async (c, next) => {
            try {

                const apiKey = c.req.header('api_key') || undefined;
                if (typeof apiKey === "undefined") {

                    return c.json({
                        success: false,
                        result: {
                            code: 400
                        },
                        message: "API_KEY is Required,Header is Missing",
                    }, 400)
                }
                if (apiKey !== c.get('API_KEY')) {

                    return c.json({
                        success: false,
                        status_code: {
                            code: 412
                        },
                        message: "Invalid KEY, Check API KEY",
                    }, 412)
                }
                c.res.headers.set('X-API', 'Verified')
                await next()
            } catch (error: any) {
                const errorResponse = new Response('500', {
                    status: 500,
                })
                throw new HTTPException(500, { res: errorResponse, message: 'Something went wrong' })
            }
        })
    }
    // Sets the X-Request-Id and X-Platform headers in the request and response objects.   
    static IRequestHeaders() {
        return createMiddleware(async (c, next) => {
            const requestId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            c.res.headers.set('X-Request-Id', requestId);
            c.res.headers.set('X-Platform', "AIRAPI - ENJOYS");            
            next();
        })

    }
}