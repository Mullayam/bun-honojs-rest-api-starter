import { FC, useContext, useState } from 'hono/jsx'
import { ThemeContext } from '../app/context/theme-context'

import { render } from 'hono/jsx/dom'
export const Button: FC = () => {
    const [count, setCount] = useState(0)
    const theme = useContext(ThemeContext)
    return <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
}