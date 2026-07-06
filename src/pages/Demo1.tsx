import { Link } from "react-router-dom";
import { createDetachedElements } from "../demos/detachedElementsLeak.ts";

export default function Demo1() {
    return (
        <main className="page">
            <Link to="/" className="back-link">На главную</Link>
            
            <h1>Демо 1: Detached элементы</h1>
            
            <div className="card card--action">
                <button type="button" className="btn btn--primary" onClick={createDetachedElements}>
                    Создать detached элементы
                </button>
            </div>
            
            <div className="info-box">
                <p className="info-box-title">Описание</p>
                <p>
                    Каждый клик создаёт <code>ul</code> с пятью <code>li</code> узлами, которые никогда не прикрепляются к
                    документу, а ссылки на них сохраняются в массиве на уровне модуля.
                </p>
            </div>
            
            <div className="section">
                <h2 className="section-title">Попробуйте:</h2>
                <ul>
                    <li>Performance monitor</li>
                    <li>
                        <code>queryObjects(Object)</code>
                        <br />
                        <code>queryObjects(Function)</code>
                        <br />
                        <code>queryObjects(HTMLElement)</code>
                    </li>
                    <li>Detached элементы</li>
                </ul>
            </div>
        </main>
    );
}
