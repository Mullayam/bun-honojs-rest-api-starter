import "dotenv/config"
import "reflect-metadata"
import { serveStatic } from 'hono/bun'
import { bootstrap } from "./src/application";
import { NotFoundException } from "@/app/libs/error";
function main() {
    const { app, port } = bootstrap.AppServer.InitailizeApplication()!

    app.use('/static/*', serveStatic({
        root: './public', onNotFound: (path, c) => {
            throw new NotFoundException()
        },
    }))
    app.use('/favicon.ico', serveStatic({
        path: './public/favicon.ico', onNotFound: (path, c) => {
            throw new NotFoundException()
        },
    }))


    return { port, fetch: app.fetch }
}

export default main()