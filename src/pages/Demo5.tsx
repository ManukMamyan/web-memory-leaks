import { Link } from "react-router-dom";
import { MemoStableModalDemo } from "../demos/memoStableModal.tsx";

export default function Demo5() {
    return (
        <main className="page">
            <Link to="/" className="back-link">На главную</Link>
            
            <h1>Демо 5: useMemo/selectors</h1>
            
            <div className="card card--action">
                <MemoStableModalDemo />
            </div>
            
            <div className="info-box">
                <p className="info-box-title">Описание</p>
                <p>
                    Использует <code>useMemo</code> и кэш в стиле reselect. Первое открытие выделяет память; повторное
                    открытие модального окна не должно увеличивать heap по этому пути.
                </p>
                <p>
                    Тяжёлые производные данные мемоизируются и разделяются между открытиями модального окна. Сравните с
                    Демо 2 при снятии heap-снапшотов или allocation timelines: стабильный паттерн после первого выделения.
                </p>
            </div>
            
            <div className="section">
                <h2 className="section-title">Попробуйте:</h2>
                <ul>
                    <li>Three-snapshot technique</li>
                    <li>
                        <code>useMemo</code> and a reselect-style cached selector - not a leak
                    </li>
                </ul>
            </div>
        </main>
    );
}
