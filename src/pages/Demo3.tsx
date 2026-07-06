/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Derived } from "../demos/demo3/Child.ts";

export default function Demo3() {
    const [showTest, setShowTest] = useState(true);

    useEffect(() => {
        const id = window.setInterval(() => {
            setShowTest((v) => !v);
            const child = new Derived();
            child.execute();
        }, 1000);
        return () => window.clearInterval(id);
    }, []);

    return (
        <main className="page">
            <Link to="/" className="back-link">На главную</Link>
            
            <h1>Демо 3: Метод трёх снапшотов</h1>
            
            <div className="card card--action">
                <p aria-live="polite" style={{ fontSize: "1.5rem", minHeight: "1.5em", margin: 0, color: "var(--tb-text-primary)" }}>
                    {showTest ? "test" : "\u00a0"}
                </p>
            </div>
            
            <div className="info-box">
                <p className="info-box-title">Описание</p>
                <p>
                    Каждый тик переключает слово <strong>test</strong> и создаёт новый <code>Derived</code>, затем вызывает{" "}
                    <code>execute()</code>. <code>Parent</code> использует <code>@boundMethod</code> (autobind-decorator);{" "}
                    <code>Derived</code> оборачивает <code>super.execute</code> в <code>lodash/debounce</code>. Проблема
                    описана в репозитории <code>autobind-decorator</code> в{" "}
                    <a href="https://github.com/andreypopp/autobind-decorator/issues/76#issuecomment-719563300" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        autobind-decorator #76
                    </a>.
                </p>
            </div>
            
            <div className="section">
                <h2 className="section-title">Попробуйте:</h2>
                <ul>
                    <li>Performance monitor (рост на графике потребления памяти)</li>
                    <li>
                        <code>queryObjects(Function)</code>
                    </li>
                    <li>Memory — стабильный рост в JS heap</li>
                    <li>Метод трёх снапшотов</li>
                </ul>
            </div>
        </main>
    );
}
