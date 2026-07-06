import { Link } from "react-router-dom";
import { leakDetachedNodes } from "../demos/detachedElementsLeak.ts";

export default function Demo1() {
    return (
        <main style={{ padding: "1rem 1.5rem", maxWidth: "42rem" }}>
            <p>
                <Link to="/">← Home</Link>
            </p>
            <h1>Демо 1: Detached элементы</h1>
            <p>
                <button type="button" onClick={leakDetachedNodes}>
                    Make detached nodes
                </button>
            </p>
            <p>
                Каждый клик создаёт <code>ul</code> с пятью <code>li</code> узлами, которые никогда не прикрепляются к
                документу, а ссылки на них сохраняются в массиве на уровне модуля.
            </p>
            <p>
                <strong>Try:</strong>
            </p>
            <ul>
                <li>Performance monitor</li>
                <li>
                    <code>queryObjects(Object)</code>
                    <br />
                    <code>queryObjects(Function)</code>
                    <br />
                    <code>queryObjects(HTMLElement)</code>
                </li>
                <li>Detached elements</li>
            </ul>
        </main>
    );
}
