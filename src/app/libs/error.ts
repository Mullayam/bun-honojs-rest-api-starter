import { HTTPException } from 'hono/http-exception'
import { StatusCode } from 'hono/utils/http-status'
export class CustomError extends HTTPException {
    constructor(status: StatusCode, options: {
        res?: Response;
        message?: string;
        cause?: unknown;
    }) {
        super(status, options)
    }
}
export class NotFoundException extends HTTPException {
    constructor(message?: string) {
        super(400, {
        cause: new Error(message),
        message: message||"The server can not find the requested page.",
      
        })
    }
}
export class ForbiddenException extends HTTPException {
    constructor(message?: string) {
        super(403, {
            cause: new Error(message||"Access is forbidden to the requested page.",),
            message: message||"Access is forbidden to the requested page.",
        })
    }
}
export class UnauthorizedException extends HTTPException {
    constructor(message?: string) {
        super(401, {
            cause: new Error(message||"Unauthorized",),
            message: message||"Unauthorized",
        })
    }
}
export class InvalidRequestException extends HTTPException {
    constructor(message?: string) {
        super(400, {
            cause: new Error(message||"Invalid or Bad Request",),
            message: message||"Invalid or Bad Request",
        })
    }
}
export class PayloadTooLargeException extends HTTPException {
    constructor(message?: string) {
        super(413, {
            cause: new Error(message||"The server will not accept the request, because the request entity is too large.",),
            message: message||"The server will not accept the request, because the request entity is too large.",
        })
    }
}