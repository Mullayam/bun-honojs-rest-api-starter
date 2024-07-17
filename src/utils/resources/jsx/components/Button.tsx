import { FC, useContext } from 'hono/jsx'
import { ThemeContext } from '../app/context/theme-context'

export const Button: FC = () => {
    const theme = useContext(ThemeContext)
    return <button style={theme}>Push!</button>
}