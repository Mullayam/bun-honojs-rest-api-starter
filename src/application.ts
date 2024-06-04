import { Hono } from 'hono'
import { CONFIG } from './app/config';
import { AppRoutes } from './routes/web';
import { poweredBy } from 'hono/powered-by'
import { Handler } from './app/modules/handler';
import { Plugins } from './app/modules/plugins'
import { ApplicationOptions } from './utils/interfaces/app';
import { AppMiddlewares } from './middlewares/app.middlewares';
import { ApplyMiddleware } from './middlewares/all.middlewares';
import { DefaultVariables } from './app/config/default-variables';
// https://github.com/rhinobase/hono-rate-limiter
class AppServer {
    static App = new Hono<ApplicationOptions<any, any>>();
    static PORT: number = +CONFIG.APP.APP_PORT;
    constructor() {
        this.SetLocalVariable()
        this.LoadAppConfigPlugins()
        this.InitMiddlewares()
        this.LoadRoutes()
        this.ExceptionHandler()
    }
    private SetLocalVariable() {
        AppServer.App.use(DefaultVariables.setApiKey())
    }
    private LoadAppConfigPlugins() {
        AppServer.App
            .use(poweredBy(), Plugins.useEtag(), Plugins.useCors())
            .use(Plugins.usePrettyJsonPrint(), Plugins.useCSRF(), Plugins.useLogger())

    }
    private InitMiddlewares() {

        CONFIG.APP.APP_ENV === 'PRODUCTION' && (
            AppServer.App.use(AppMiddlewares.IRequestHeaders()),
            AppServer.App.use(AppMiddlewares.isApiProtected())
        )
        AppServer.App.use(ApplyMiddleware("testMiddleware"))
    }
    private ExceptionHandler() {
        AppServer.App.onError((Handler.AppLevel))
        AppServer.App.notFound(Handler.UnhandledRoutes)
    }
    protected LoadRoutes() {
        AppServer.App.route("/", AppRoutes.MainRoutes())
    }
    InitailizeApplication(): {
        port: number;
        app: Hono<ApplicationOptions<any, any>>
    } {     
        return {
            port: AppServer.PORT,
            app: AppServer.App as Hono<ApplicationOptions<any, any>>,
        }
    }
}
export const bootstrap = { AppServer: new AppServer() }