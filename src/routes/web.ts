import testController from "@/controllers/test.controller";
import { Hono } from "hono";

type Variables = {
    message: string
}
export class AppRoutes {
    static MainRoutes(baseUrl?: string) {
        if (!baseUrl) {
            baseUrl = '/'
        }
        const app = new Hono<{ Variables: Variables }>().basePath(baseUrl)
        app.get('/', testController.test)
        app.get('/welcome', () => {
            return new Response('Thank you for coming', {
                status: 201,
                headers: {
                  'X-Message': 'Hello!',
                  'Content-Type': 'text/plain',
                },
              })
          })
        return app
    }
    private TestRoutes() {
        // Wildcard
        // app.get('/wild/*/card', (c) => {
        //     return c.text('GET /wild/*/card')
        // })

        // // Any HTTP methods
        // app.all('/hello', (c) => c.text('Any Method /hello'))

        // // Custom HTTP method
        // app.on('PURGE', '/cache', (c) => c.text('PURGE Method /cache'))

        // // Multiple Method
        // app.on(['PUT', 'DELETE'], '/post', (c) => c.text('PUT or DELETE /post'))

        // // Multiple Paths
        // app.on('GET', ['/hello', '/ja/hello', '/en/hello'], (c) => c.text('Hello'))
    }
}