import { createContext } from 'hono/jsx'

export const themes = {
    light: {
        color: '#000000',
        background: '#eeeeee',
    },
    dark: {
        color: '#ffffff',
        background: '#222222',
    },
}

export const ThemeContext = createContext(themes.light)