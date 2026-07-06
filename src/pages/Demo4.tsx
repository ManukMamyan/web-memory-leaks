import { Link } from "react-router-dom";
import { ModalLeakExample } from "../demos/modalLeak.tsx";

export default function Demo4() {
    return (
        <main className="page">
            <Link to="/" className="back-link">На главную</Link>
            
            <h1>Демо 4: Утечки в React</h1>
            
            <div className="card card--action">
                <ModalLeakExample />
            </div>
            
            <div className="info-box">
                <p className="info-box-title">Описание</p>
                <p>
                    Открыть и закрыть модальное окно. Каждый mount регистрирует слушателей событий; при unmount нет отписки — DOM Node остаётся в памяти.
                </p>
                <p>
                    <code>ModalWithLeak</code> — классовый-компонент, поэтому экземпляры легко найти (например,{" "}
                    <code>queryObjects(ModalWithLeak)</code> в консоли).
                </p>
            </div>
            
            <div className="section">
                <h2 className="section-title">Попробуйте:</h2>
                <ul>
                    <li>
                        <code>queryObjects(HTMLElement)</code>
                    </li>
                    <li>Allocations on timeline</li>
                    <li>Метод трёх снапшотов</li>
                    <li>React DevTools, Web Vitals и другие расширения создают шум — лучше в режиме инкогнито</li>
                </ul>
            </div>
        </main>
    );
}
