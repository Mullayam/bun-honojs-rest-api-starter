import { Hono } from 'hono'
import { CONFIG } from './app/config';
import { AppRoutes } from './routes/web';
import { serve } from '@hono/node-server'
import { poweredBy } from 'hono/powered-by'
import { Limiter, Plugins } from './app/modules/plugins'
import { GlobalHandler } from './app/modules/handler';
import { ApplicationOptions } from './utils/interfaces/app';
import { serveStatic } from '@hono/node-server/serve-static'
import { AppMiddlewares } from './middlewares/app.middlewares';
import { ApplyMiddleware } from './middlewares/all.middlewares';
import { DefaultVariables } from './app/config/default-variables';
import { NotFoundException } from './app/libs/error';
import { clientApp } from './utils/resources/jsx';

class AppServer {
    static App = new Hono<ApplicationOptions<any, any>>();
    static PORT: number = +CONFIG.APP.APP_PORT;
    /**
     * Initializes the object by setting local variables, loading app configuration plugins,
     * initializing middlewares, loading routes, and handling exceptions.
     */
    constructor() {
        this.SetLocalVariable()
        this.LoadAppConfigPlugins()
        this.InitMiddlewares()
        this.LoadRoutes()
        this.ExceptionHandler()
    }
    /**
     * Sets a local variable in the application.
     *
     * @return {void} This function does not return a value.
     */
    private SetLocalVariable() {
        AppServer.App.use(DefaultVariables.setApiKey())
    }
    /**
     * Loads the application configuration plugins in a specific sequence.
     *
     * @return {void} This function does not return a value.
     */
    private LoadAppConfigPlugins() {
        // Load Plugins in Sequence mode 
        AppServer.App
            .use(poweredBy(), Plugins.useEtag(), Plugins.useCors())
            .use(Plugins.usePrettyJsonPrint(), Plugins.useCSRF(), Plugins.useLogger())
            .use(Plugins.useIpRestriction())
        // .use(Limiter) // Use Rate Limiter Middleware
        // .use(Plugins.useFileInterceptor()) // Use File Interceptor to detect file upload

        // Use Client App for SSR using Hono JSX
        AppServer.App.route('/client', clientApp)

        // Use Serve Static Middleware that has been created for Node.js.
        CONFIG.APP.APP_ENV === 'PRODUCTION' && (AppServer.App.use('/static/*', serveStatic({
            root: '../public',
            onNotFound: (path, c) => {
                throw new NotFoundException()
            },
        })))

    }
    /**
     * Loads and initializes middlewares based on the environment.
     *
     * @return {void} This function does not return a value.
     */
    private InitMiddlewares() {
        CONFIG.APP.APP_ENV === 'PRODUCTION' && (
            AppServer.App.use(AppMiddlewares.IRequestHeaders()),
            AppServer.App.use(AppMiddlewares.isApiProtected())
        )
        // Apply Your Custom Middlewares Here, you can call multiple middlewares in one line
        AppServer.App.use(ApplyMiddleware("testMiddleware"))
    }
    /**
     * Sets up the exception handling and not found routes for the application.
     *
     * This function registers the `AppLevel` function as the error handler for the application,
     * and the `UnhandledRoutes` function as the not found route handler.
     *
     * @return {void} This function does not return a value.
     */
    private ExceptionHandler() {
        AppServer.App.onError(GlobalHandler.AppLevel)
        AppServer.App.notFound(GlobalHandler.UnhandledRoutes)
    }
    protected LoadRoutes() {
        AppServer.App.route("/", AppRoutes.MainRoutes())
    }
    /**
     * Returns the Hono application instance.
     *
     * @return {Hono<ApplicationOptions<any, any>>} The Hono application instance.
     */
    getApp(): Hono<ApplicationOptions<any, any>> {
        return AppServer.App
    }
    /**
     * Initializes the application and returns the port and Hono application instance.
     *
     * @return {Object} An object containing the port number and the Hono application instance.
     * @property {number} port - The port number on which the application is running.
     * @property {Hono<ApplicationOptions<any, any>>} app - The Hono application instance.
     */
    InitailizeApplication(): {
        port: number;
        app: Hono<ApplicationOptions<any, any>>
    } {
        serve(AppServer.App, (info) => {
            console.log(`Listening on http://localhost:${info.port}`) // Listening on http://localhost:3000
        })
        return {
            port: AppServer.PORT,
            app: AppServer.App as Hono<ApplicationOptions<any, any>>,
        }
    }
}
export const bootstrap = { AppServer: new AppServer() }