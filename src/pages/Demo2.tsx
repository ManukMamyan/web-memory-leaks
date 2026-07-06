import { Link } from "react-router-dom";
import { leakJs } from "../demos/jsHeapLeak.ts";

const CHROME_ALLOCATION_TIMELINE = "https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/";

export default function Demo2() {
    return (
        <main style={{ padding: "1rem 1.5rem", maxWidth: "42rem" }}>
            <p>
                <Link to="/">← Home</Link>
            </p>
            <h1>Демо 2: JS утечки + allocation timeline</h1>
            <p>
                <button type="button" onClick={leakJs}>
                    Make JavaScript leak
                </button>
            </p>
            <p>
                Большие строки добавляются в массив на уровне модуля. Использование <code>indexOf</code> на строке
                заставляет V8 материализовать другое представление строки (cons vs seq), что чётко видно на timeline
                выделений.
            </p>
            <p>
                <strong>Try:</strong>
            </p>
            <ul>
                <li>Performance monitor</li>
                <li>
                    <code>queryObjects(Object)</code> / <code>queryObjects(Function)</code>
                </li>
                <li>
                    Allocations on timeline (<a href={CHROME_ALLOCATION_TIMELINE}>guide</a>)
                </li>
            </ul>
        </main>
    );
}
