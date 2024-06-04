import { Context } from "hono";
import { HTTPException } from 'hono/http-exception'
class TestController{
    public test(c:Context) {
        return c.notFound()
    }
} 
export default new TestController()