import { AbstractRoute } from "@/app/libs/abstract-route";
import testController from "@/controllers/test.controller";
import { Hono } from "hono";

type Variables = {
    message: string
}
export class TestRoutes extends AbstractRoute {
    static MainRoutes(baseUrl?: string) {
        if (!baseUrl) {
            baseUrl = '/'
        }
        const app = new Hono<{ Variables: Variables }>().basePath(baseUrl)

        app.get('/', testController.test)
        app.get('/welcome', () => {
            return new Response('Thank you for coming From api/test/welcome', {
                status: 201,
                headers: {
                    'X-Message': 'Hello!',
                    'Content-Type': 'text/plain',
                },
            })
        })
         
        return app
    }

}