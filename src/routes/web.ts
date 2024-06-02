import testController from "@/controllers/test.controller";
import { Hono } from "hono";

type Variables  = {
    message: string 
}
export class AppRoutes {
      static MainRoutes(baseUrl?: string) {
        if (!baseUrl) {
            baseUrl = '/'
        } 
        const app = new Hono<{ Variables: Variables }>().basePath(baseUrl)
        app.get('/',testController.test)
        return app
    }
}