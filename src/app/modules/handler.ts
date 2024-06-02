import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import { basicAuth } from 'hono/basic-auth'
import { createFactory } from 'hono/factory'

type Env = {
    Variables: {
        foo: string
    }
}
const factory = createFactory<Env>()
const handlers = factory.createHandlers(logger(), (c) => {
    return c.json(c.var.foo)
})