import { Context } from "hono";
import { renderHtml } from "@/utils/resources/html";
class TestController{
    public test(c:Context) {        
        return c.notFound()
    }
    public htmlDisplay(c:Context) {        
        return c.html(renderHtml('<h1>test</h1>', {}))
    }
} 
export default new TestController()