import { Link } from "react-router-dom";
import { MemoStableModalDemo } from "../demos/memoStableModal.tsx";

export default function Demo23() {
    return (
        <main style={{ padding: "1rem 1.5rem", maxWidth: "42rem" }}>
            <p>
                <Link to="/">← Home</Link>
            </p>
            <h1>Демо 5: useMemo/selectors</h1>
            <MemoStableModalDemo />
            <p>
                Использует <code>useMemo</code> и кэш в стиле reselect. Первое открытие выделяет память; повторное
                открытие модального окна не должно увеличивать heap по этому пути.
            </p>
            <p>
                Тяжёлые производные данные мемоизируются и разделяются между открытиями модального окна. Сравните с
                2.1 при снятии heap-снапшотов или allocation timelines: стабильный паттерн после первого выделения.
            </p>
            <p>
                <strong>Try:</strong>
            </p>
            <ul>
                <li>Three-snapshot technique</li>
                <li>
                    <code>useMemo</code> and a reselect-style cached selector - not a leak
                </li>
            </ul>
        </main>
    );
}
