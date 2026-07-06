import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="page">
            <h1>Демонстрации утечек памяти</h1>
            <p>Интерактивные примеры различных типов утечек памяти в JavaScript и React.</p>
            
            <ul className="nav-grid">
                <li className="nav-grid-item">
                    <Link to="/demo-1" className="nav-grid-link">
                        <span className="nav-grid-label">Демо 1: Detached элементы</span>
                    </Link>
                </li>
                <li className="nav-grid-item">
                    <Link to="/demo-2" className="nav-grid-link">
                        <span className="nav-grid-label">Демо 2: Утечки JS + allocation on timeline</span>
                    </Link>
                </li>
                <li className="nav-grid-item">
                    <Link to="/demo-3" className="nav-grid-link">
                        <span className="nav-grid-label">Демо 3: Метод трёх снапшотов</span>
                    </Link>
                </li>
                <li className="nav-grid-item">
                    <Link to="/demo-4" className="nav-grid-link">
                        <span className="nav-grid-label">Демо 4: Утечки в React</span>
                    </Link>
                </li>
                <li className="nav-grid-item">
                    <Link to="/demo-5" className="nav-grid-link">
                        <span className="nav-grid-label">Демо 5: useMemo и селекторы</span>
                    </Link>
                </li>
            </ul>
        </main>
    );
}
