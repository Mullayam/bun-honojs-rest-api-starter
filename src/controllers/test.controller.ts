import { Context } from "hono";
class TestController {
    public test(c: Context) {
        return c.notFound()
    }

}
export default new TestController()