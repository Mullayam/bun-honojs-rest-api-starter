import "dotenv/config"
import "reflect-metadata"
import { bootstrap } from "./src/application";

function main() {
    const app = bootstrap.AppServer.InitailizeApplication()!

    return app
}

export default main()