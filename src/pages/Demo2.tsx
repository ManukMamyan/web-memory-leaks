import { Link } from "react-router-dom";
import { leakJs } from "../demos/jsHeapLeak.ts";

const CHROME_ALLOCATION_TIMELINE = "https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/";

export default function Demo2() {
    return (
        <main className="page">
            <Link to="/" className="back-link">На главную</Link>
            
            <h1>Демо 2: JS утечки + allocation timeline</h1>
            
            <div className="card card--action">
                <button type="button" className="btn btn--primary" onClick={leakJs}>
                    Создать утечку
                </button>
            </div>
            
            <div className="info-box">
                <p className="info-box-title">Описание</p>
                <p>
                    Большие строки добавляются в массив на уровне модуля. Использование <code>indexOf</code> на строке
                    заставляет V8 материализовать другое представление строки (cons vs seq), что чётко видно на timeline
                    выделений.
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
                        <a href={CHROME_ALLOCATION_TIMELINE} target="_blank" rel="noopener noreferrer">guide</a>)
                    </li>
                </ul>
            </div>
        </main>
    );
}
