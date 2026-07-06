 
import { Link } from "react-router-dom";
import { allocateMemory } from "../demos/jsHeapLeak.ts";

const CHROME_ALLOCATION_TIMELINE = "https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/";

export default function Demo2() {
    return (
        <main className="page">
            <Link to="/" className="back-link">На главную</Link>
            
            <h1>Демо 2: Утечки JS + allocations on timeline</h1>
            
            <div className="card card--action">
                <button type="button" className="btn btn--primary" onClick={allocateMemory}>
                    Создать утечку
                </button>
            </div>
            
            <div className="info-box">
                <p className="info-box-title">Описание</p>
                <p>
                    В модуле хранится массив, в который добавляются большие строки. Когда к строке применяют
                    <code>indexOf</code>, V8 переключается с lazy-представления на seq (материализует данные),
                    и на timeline это заметно.
                </p>
            </div>
            
            <div className="section">
                <h2 className="section-title">Попробуйте:</h2>
                <ul>
                    <li>Performance monitor</li>
                    <li>
                        <code>queryObjects(Object)</code> / <code>queryObjects(Function)</code>
                    </li>
                    <li>
                        Allocations on timeline (
                        <a href={CHROME_ALLOCATION_TIMELINE} target="_blank" rel="noopener noreferrer">руководство</a>)
                    </li>
                </ul>
            </div>
        </main>
    );
}
