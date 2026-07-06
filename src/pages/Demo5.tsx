import { Link } from "react-router-dom";
import { MemoizedModalDemo } from "../demos/memoStableModal.tsx";

export default function Demo5() {
    return (
        <main className="page">
            <Link to="/" className="back-link">На главную</Link>
            
            <h1>Демо 5: useMemo и селекторы</h1>
            
            <div className="card card--action">
                <MemoizedModalDemo />
            </div>
            
            <div className="info-box">
                <p className="info-box-title">Описание</p>
                <p>
                    Использует <code>useMemo</code> и кэш в стиле reselect. Первое открытие выделяет память; повторное
                    открытие модального окна не должно увеличивать heap по этому пути.
                </p>
                <p>
                    Тяжёлые производные данные мемоизируются и разделяются между открытиями модального окна. Сравните с
                    Демо 2 при снятии heap-снапшотов или allocations on timeline: стабильный паттерн после первого allocation.
                </p>
            </div>
            
            <div className="section">
                <h2 className="section-title">Попробуйте:</h2>
                <ul>
                    <li>Метод трёх снапшотов</li>
                    <li>
                        <code>useMemo</code> и кэшированный селектор — не утечка
                    </li>
                </ul>
            </div>
        </main>
    );
}
