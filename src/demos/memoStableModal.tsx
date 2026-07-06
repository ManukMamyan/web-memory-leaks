import React, { useMemo, useState } from "react";

const blockStyle: React.CSSProperties = {
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    background: "#1C1C1C",
};

const buttonStyle: React.CSSProperties = {
    padding: "0.625rem 1.5rem",
    borderRadius: 8,
    border: "none",
    background: "#FFDD2D",
    color: "#0A0A0A",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.5,
    transition: "all 120ms ease",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
};

const closeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "rgba(255, 255, 255, 0.08)",
    color: "#F1F1F1",
    border: "1px solid rgba(255, 255, 255, 0.12)",
};

const metaTextStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    color: "#999999",
    fontFamily: "inherit",
};

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 16,
};

const modalContentStyle: React.CSSProperties = {
    background: "#1C1C1C",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 32,
    minWidth: 340,
    maxWidth: 480,
    width: "100%",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
    color: "#F1F1F1",
};

const modalTitleStyle: React.CSSProperties = {
    margin: "0 0 16px",
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#F1F1F1",
    letterSpacing: "-0.02em",
};

const modalPStyle: React.CSSProperties = {
    margin: "0 0 12px",
    fontSize: "0.9em",
    color: "#CCCCCC",
    lineHeight: 1.7,
};

function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
}

interface DataItem {
    id: number;
    value: string;
}

function createCachedSelector() {
    let cache: { input: null; result: null } | { input: DataItem[]; result: string[] } = { input: null, result: null };

    return (items: DataItem[]): string[] => {
        if (cache.input === items) {
            return cache.result;
        }

        cache = { input: items, result: items.map((item) => `[cached] ${item.value}`) };
        return cache.result;
    };
}

const selectProcessedData = createCachedSelector();

const ITEM_COUNT = 10_000;

export function MemoizedModalDemo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const heavyData = useMemo<DataItem[]>(() => {
        if (!isInitialized) {
            return [];
        }
        return Array.from({ length: ITEM_COUNT }, (_, i) => ({
            id: i,
            value: `item-${i}-${"x".repeat(100)}`,
        }));
    }, [isInitialized]);

    const processedData = useMemo(() => {
        if (heavyData.length === 0) {
            return [];
        }
        return selectProcessedData(heavyData);
    }, [heavyData]);

    const handleOpen = () => {
        setIsInitialized(true);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={blockStyle}>
            <h3 style={modalTitleStyle}>useMemo + кэш селектора</h3>

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                <button onClick={handleOpen} style={buttonStyle} type="button">
                    Показать окно
                </button>
                <span style={metaTextStyle}>
                    Элементов: {heavyData.length.toLocaleString()} | Обработано:{" "}
                    {processedData.length.toLocaleString()}
                </span>
            </div>

            {isModalOpen ? (
                <div onClick={handleClose} role="presentation" style={overlayStyle}>
                    <div onClick={stopPropagation} role="presentation" style={modalContentStyle}>
                        <h3 style={modalTitleStyle}>Модальное окно</h3>
                        <p style={modalPStyle}>
                            При первом открытии создаются данные и заполняется кэш. Повторные открытия используют
                            существующие ссылки на данные и кэшированные результаты.
                        </p>
                        <p style={{ ...modalPStyle, fontWeight: 500 }}>
                            Строк: {heavyData.length.toLocaleString()} | Результатов:{" "}
                            {processedData.length.toLocaleString()}
                        </p>
                        <button onClick={handleClose} style={closeButtonStyle} type="button">
                            Закрыть
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
