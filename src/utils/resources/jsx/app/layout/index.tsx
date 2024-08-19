import { FC, PropsWithChildren } from "hono/jsx"
import { ThemeContext, themes } from "../context/theme-context"

const RootLayout: FC<PropsWithChildren<{ title: string }>> = ({ title, children }) => {
  return (
    <html>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <body>
        <ThemeContext.Provider value={themes.dark}>
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  )
}
export default RootLayout;