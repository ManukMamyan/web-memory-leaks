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

        cache = { input: items, result: items.map((item) => `[processed] ${item.value}`) };
        return cache.result;
    };
}

const selectProcessedData = createCachedSelector();

const MEMO_ITEM_COUNT = 10_000;

export function MemoStableModalDemo() {
    const [modalOpen, setModalOpen] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const heavyData = useMemo<DataItem[]>(() => {
        if (!initialized) {
            return [];
        }
        // console.log("allocating heavyData", initialized);
        return Array.from({ length: MEMO_ITEM_COUNT }, (_, i) => ({
            id: i,
            value: `item-${i}-${"x".repeat(100)}`,
        }));
    }, [initialized]);

    const processedData = useMemo(() => {
        if (heavyData.length === 0) {
            return [];
        }
        // console.log("allocating processedData", heavyData.length);
        return selectProcessedData(heavyData);
    }, [heavyData]);

    const handleOpen = () => {
        setInitialized(true);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div style={blockStyle}>
            <h3 style={modalTitleStyle}>useMemo + кэшированный селектор</h3>

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                <button onClick={handleOpen} style={buttonStyle} type="button">
                    Открыть модальное окно
                </button>
                <span style={metaTextStyle}>
                    useMemo rows: {heavyData.length.toLocaleString()} | Selector strings:{" "}
                    {processedData.length.toLocaleString()}
                </span>
            </div>

            {modalOpen ? (
                <div onClick={handleCloseModal} role="presentation" style={overlayStyle}>
                    <div onClick={stopPropagation} role="presentation" style={modalContentStyle}>
                        <h3 style={modalTitleStyle}>Modal</h3>
                        <p style={modalPStyle}>
                            Первое открытие запускает мемо и заполняет кэш селектора. Последующие открытия используют
                            ту же ссылку на <code>heavyData</code> и кэшированные производные строки.
                        </p>
                        <p style={{ ...modalPStyle, fontWeight: 500 }}>
                            Rows: {heavyData.length.toLocaleString()} | Processed:{" "}
                            {processedData.length.toLocaleString()}
                        </p>
                        <button onClick={handleCloseModal} style={closeButtonStyle} type="button">
                            Закрыть
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
