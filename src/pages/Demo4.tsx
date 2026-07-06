import { Link } from "react-router-dom";
import { ModalLeakDemo } from "../demos/modalLeak.tsx";

export default function Demo4() {
    return (
        <main className="page">
            <Link to="/" className="back-link">На главную</Link>
            
            <h1>Демо 4: Утечки памяти в React</h1>
            
            <div className="card card--action">
                <ModalLeakDemo />
            </div>
            
            <div className="info-box">
                <p className="info-box-title">Описание</p>
                <p>
                    Открывайте и закрывайте модальное окно повторно. Каждый mount регистрирует глобальные слушатели;
                    ref-колбэк никогда не освобождает последний DOM-узел при размонтировании экземпляра.
                </p>
                <p>
                    <code>LeakyModalContent</code> — класс-компонент, поэтому экземпляры легко найти (например,{" "}
                    <code>queryObjects(LeakyModalContent)</code> в консоли, когда он экспортирован в <code>window</code>).
                </p>
            </div>
            
            <div className="section">
                <h2 className="section-title">Попробуйте:</h2>
                <ul>
                    <li>
                        <code>queryObjects(HTMLElement)</code>
                    </li>
                    <li>Allocations on timeline</li>
                    <li>Three-snapshot technique</li>
                    <li>React DevTools, Web Vitals и другие расширения создают шум — лучше в режиме инкогнито</li>
                </ul>
            </div>
        </main>
    );
}
