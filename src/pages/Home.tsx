import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main style={{ padding: "1rem 1.5rem", maxWidth: "42rem" }}>
            <h1>Memory leaks demo</h1>
            <ul>
                <li>
                    <Link to="/demo-1">Демо 1: Detached элементы</Link>
                </li>
                <li>
                    <Link to="/demo-2">Демо 2: JS утечки + allocation timeline</Link>
                </li>
                <li>
                    <Link to="/demo-3">Демо 3: Техника трех снапшотов</Link>
                </li>
                <li>
                    <Link to="/demo-4">Демо 4: Утечки памяти в React</Link>
                </li>
                <li>
                    <Link to="/demo-5">Демо 5: useMemo/selectors</Link>
                </li>
            </ul>
        </main>
    );
}
