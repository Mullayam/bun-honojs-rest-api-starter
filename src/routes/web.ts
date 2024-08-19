import testController from "@/controllers/test.controller";
import { Hono } from "hono";
import { TestRoutes } from "./test.route";

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
      return new Response('Thank you for coming from api/welcome', {
        status: 201,
        headers: {
          'X-Message': 'Hello!',
          'Content-Type': 'text/plain',
        },
      })
    })
    app.get('/tes', (c) => {
      return c.html(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Hono + React</title>
              </head>
              <body>
                <div id="root"></div>
                <script type="module" src="/_static/chunk.js"></script>
              </body>
              </html>
            `);
    });

    // Bind your Routes here, Un comment to use and add your routes to route for more  plz read docs
    // can remove baseUrl if not using the above given prefix , pass empty string or  "/"
    app.route(baseUrl,TestRoutes.MainRoutes('/test'))
    this.TestRoutes(app) // test routes for tesitng purpose can use further
    this.UnhandledRoutes(app)
    return app
  }
  private static UnhandledRoutes(app: Hono<any, any>) {
    return app.all('*', (c) => c.notFound())
  }
  private static TestRoutes(app: Hono<any, any>) {

    app.get('/wild/*/card', (c) => {
      return c.text('GET /wild/*/card')
    })
    // Any HTTP methods
    app.all('/hello', (c) => c.text('Any Method /hello'))

    // Custom HTTP method
    app.on('PURGE', '/cache', (c) => c.text('PURGE Method /cache'))

    // Multiple Method
    app.on(['PUT', 'DELETE'], '/post', (c) => c.text('PUT or DELETE /post'))

    // Multiple Paths
    app.on('GET', ['/hello', '/ja/hello', '/en/hello'], (c) => c.text('Hello'))
  }
}