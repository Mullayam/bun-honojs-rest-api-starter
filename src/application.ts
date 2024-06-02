import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { etag } from 'hono/etag'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'
import { CONFIG } from './app/config';
import { AppRoutes } from './routes/web';
import { ApplyMiddleware } from './middlewares/all.middlewares';

// https://github.com/rhinobase/hono-rate-limiter
class AppServer {
    static App: Hono = new Hono();
    static PORT: number = +CONFIG.APP.APP_PORT;
    constructor() {
       this.LoadConfig()
       this.InitMiddlewares()
       this.LoadRoutes()
       this.ExceptionHandler()
    }
    private LoadConfig() {
        AppServer.App.use(etag())
        AppServer.App.use(prettyJSON())
        AppServer.App.use(secureHeaders())
        AppServer.App.use(csrf({ origin: 'myapp.example.com' }))
        AppServer.App.use(cors({
            origin: 'http://example.com',
            allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
            allowMethods: ['POST', 'GET', 'OPTIONS'],
            exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
            maxAge: 600,
            credentials: true,
          }))
        AppServer.App.notFound((c) => {
            return c.text('Custom 404 Message', 404)
          }) 
    }
    private InitMiddlewares() {
        AppServer.App.use(ApplyMiddleware("testMiddleware"))
    }
    private ExceptionHandler() {
        AppServer.App.notFound((c) => {
            return c.text('Custom 404 Message', 404)
          }) 
    }
    protected LoadRoutes() {       
        AppServer.App.route("/",AppRoutes.MainRoutes())
    }
    InitailizeApplication(): Hono {
        return AppServer.App
    }
}
export const bootstrap = { AppServer: new AppServer() }