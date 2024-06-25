// import { zValidator } from '@hono/zod-validator'
import { ValidationTargets } from 'hono'
import { createMiddleware } from 'hono/factory'
import { validator } from 'hono/validator'
import { z } from 'zod'
// const validationMiddleware = (schema: z.ZodSchema, target: keyof ValidationTargets) => {
//     return createMiddleware(async (c, next) => {
//         await next()
//         zValidator(target, schema, (result, c) => {
//             if (!result.success) {
//                 return c.json({
//                     success: false,
//                     error: {
//                         code: 400,
//                         message: result.error.issues[0].message,
//                         innerError: {
//                             timestamp: new Date(Date.now())
//                         }
//                     }
//                 })
//             }
//         })
//     })
// }