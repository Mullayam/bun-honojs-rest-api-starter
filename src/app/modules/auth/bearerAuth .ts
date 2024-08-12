import { CONFIG } from '@/app/config'
import { bearerAuth } from 'hono/bearer-auth'

const APP_SECRET = CONFIG.SECRETS.APP_SECRET

// https://hono.dev/docs/middleware/builtin/bearer-auth

export const ProtectedAppRoutesWithBearerAuth = bearerAuth({
    prefix: 'API_E1',
    headerName: 'E-Api-Secret',
    verifyToken(token, c) {
        return token === APP_SECRET
    },
})