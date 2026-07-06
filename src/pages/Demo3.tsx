import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Child } from "../demos/demo14/Child.ts";

export default function Demo14() {
    const [showTest, setShowTest] = useState(true);

    useEffect(() => {
        const id = window.setInterval(() => {
            setShowTest((v) => !v);
            const child = new Child();
            child.method();
        }, 1000);
        return () => window.clearInterval(id);
    }, []);

    return (
        <main style={{ padding: "1rem 1.5rem", maxWidth: "42rem" }}>
            <p>
                <Link to="/">← Home</Link>
            </p>
            <h1>Демо 3: Техника трех снапшотов</h1>
            <p aria-live="polite" style={{ fontSize: "1.5rem", minHeight: "1.5em" }}>
                {showTest ? "test" : "\u00a0"}
            </p>
            <p>
                Каждый тик переключает слово <strong>test</strong> и создаёт новый <code>Child</code>, затем вызывает{" "}
                <code>method()</code>. <code>Base</code> использует <code>@boundMethod</code> (autobind-decorator);{" "}
                <code>Child</code> оборачивает <code>super.method</code> в <code>lodash/debounce</code>. Проблема
                описана в репозитории <code>autobind-decorator</code> в{" "}
                <a href="https://github.com/andreypopp/autobind-decorator/issues/76#issuecomment-719563300">
                    autobind-decorator #76
                </a>
                .
            </p>
            <p>
                <strong>Try:</strong>
            </p>
            <ul>
                <li>Performance monitor (JS heap may look calmer)</li>
                <li>
                    <code>queryObjects(Function)</code>
                </li>
                <li>Memory — steady growth in JS heap</li>
                <li>Three-snapshot technique</li>
            </ul>
        </main>
    );
}
