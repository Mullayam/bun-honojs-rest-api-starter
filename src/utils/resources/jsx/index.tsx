import type { FC } from 'hono/jsx'
import { jsx ,PropsWithChildren } from 'hono/jsx'
import { Hello } from './app/hello';
import { Button } from './components/Button';
import { ThemeContext, themes } from './app/context/theme-context';
import { Hono } from 'hono'
import { hc } from 'hono/client'
import { render } from 'hono/jsx/dom'
const app = new Hono()

function Component({ title, children }: PropsWithChildren<any>) {
    return (
      <div>
        <h1>{title}</h1>
        {children}
      </div>
    )
  }
const RootLayout: FC<{ title: string }> = ({ title }) => {
    return (
        <html>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <body>
                <ThemeContext.Provider value={themes.dark}>
                    <Button />
                    <Hello />
                </ThemeContext.Provider>
                <script type="module">
                console.log("dtet")

                </script>
            </body>
        </html>
    )
}

const routes = app.get('/', (c) => c.html(<RootLayout title='ENJOYS'/>))

app.all('/*', (c) => c.html(<RootLayout  title='Not Found'/>))


export type AppType = typeof routes
const rpc = hc<AppType>("/") // RPC client
// rpc.
export default app