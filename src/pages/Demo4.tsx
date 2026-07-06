import { Link } from "react-router-dom";
import { ModalLeakDemo } from "../demos/modalLeak.tsx";

export default function Demo21() {
    return (
        <main style={{ padding: "1rem 1.5rem", maxWidth: "42rem" }}>
            <p>
                <Link to="/">← Home</Link>
            </p>
            <h1>Демо 4: Утечки памяти в React</h1>
            <ModalLeakDemo />
            <p>
                Открывайте и закрывайте модальное окно повторно. Каждый mount регистрирует глобальные слушатели;
                ref-колбэк никогда не освобождает последний DOM-узел при размонтировании экземпляра.
            </p>
            <p>
                <code>LeakyModalContent</code> — класс-компонент, поэтому экземпляры легко найти (например,{" "}
                <code>queryObjects(LeakyModalContent)</code> в консоли, когда он экспортирован в <code>window</code>).
            </p>
            <p>
                <strong>Try:</strong>
            </p>
            <ul>
                <li>
                    <code>queryObjects(HTMLElement)</code>
                </li>
                <li>Allocations on timeline</li>
                <li>Three-snapshot technique</li>
                <li>React DevTools, Web Vitals и другие расширения создают шум — лучше в режиме инкогнито</li>
            </ul>
        </main>
    );
}
