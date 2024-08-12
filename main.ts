import "dotenv/config"
import "reflect-metadata"
// import { serveStatic } from 'hono/bun'
import { serveStatic } from '@hono/node-server/serve-static'
import { bootstrap } from "./src/application";
import { NotFoundException } from "@/app/libs/error";

function main() {
    const { app, port } = bootstrap.AppServer.InitailizeApplication()!

    app.get(
        '/_static/*',
        serveStatic({
            root: './',
            rewriteRequestPath: (path) => {
                console.log(path.replace(/^\/_static/, '/public'))
                return path.replace(/^\/_static/, '/public')
            },
            onNotFound: (path, c) => {                 
                c.redirect('/_static/404.html')
            },
        })
    )
 
    app.use('/favicon.ico', serveStatic({
        path: './public/favicon.ico', onNotFound: (path, c) => {
            throw new NotFoundException()
        },
    }))

    return { port, fetch: app.fetch }
}

export default main()