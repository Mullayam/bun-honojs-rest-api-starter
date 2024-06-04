import "dotenv/config"
import "reflect-metadata"
import { serveStatic } from 'hono/bun'
import { bootstrap } from "./src/application";
function main() {
    const { app, port } = bootstrap.AppServer.InitailizeApplication()!

    app.use('/static/*', serveStatic({
        root: './public', onNotFound: (path, c) => {
            console.log(`${path} is not found, you access ${c.req.path}`)
        },
    }))
    app.use('/favicon.ico', serveStatic({
        path: './public/favicon.ico', onNotFound: (path, c) => {
            console.log(`${path} is not found, you access ${c.req.path}`)
        },
    }))


    return { port, fetch: app.fetch }
}

export default main()