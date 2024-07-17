import type { FC } from 'hono/jsx'
import { bootstrap } from '@/application'
import { Hello } from './app/hello';
import { Button } from './components/Button';
import { ThemeContext, themes } from './app/context/theme-context';
const clientApp = bootstrap.AppServer.getApp()



export const RootLayout: FC = () => {
    return (
        <html>
            <body>
                <ThemeContext.Provider value={themes.dark}>
                    <Button />
                    <Hello />
                </ThemeContext.Provider>
            </body>
        </html>
    )
}
clientApp.get('/', (c) => c.html(<RootLayout />))

export { clientApp }