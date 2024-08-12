import { basicAuth } from 'hono/basic-auth'

export const SimpleAuth = basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })