import {  useState } from 'hono/jsx'

export const CounterComponent = ({ initialCount }: { initialCount: number }) => {
    const [count, setCount] = useState(initialCount);

    const increment = () => setCount(count + 1);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};