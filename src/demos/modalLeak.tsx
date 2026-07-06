import React, { PureComponent, useCallback, useState } from "react";

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

const buttonDisabledStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "#444444",
    color: "#888888",
    cursor: "not-allowed",
    boxShadow: "none",
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

export class ModalWithLeak extends PureComponent<{ onClose: () => void }> {
    static displayName = "ModalWithLeak";

    componentDidMount() {
        window.addEventListener("beforeunload", this.handleUnload);
        window.addEventListener("pagehide", this.handleUnload);
    }

    domNode: HTMLDivElement | null = null;

    private setRef = (el: HTMLDivElement | null) => {
        if (el) {
            this.domNode = el;
        }
        if (Math.random() > 2) {
            console.log("setRef", el, this.domNode);
        }
    };

    private handleUnload = () => {
        this.props.onClose();
    };

    render() {
        return (
            <div ref={this.setRef} style={modalContentStyle}>
                <h3 style={modalTitleStyle}>Модальное окно</h3>
                <p style={modalPStyle}>
                    Компонент подписывается на события <code>beforeunload</code> и <code>pagehide</code> при монтировании,
                    но не отписывается при размонтировании.
                </p>
                <p style={modalPStyle}>
                    Ref-функция сохраняет ссылку на DOM-элемент и не очищает её при размонтировании,
                    что приводит к удержанию памяти.
                </p>
                <button onClick={this.props.onClose} style={closeButtonStyle} type="button">
                    Закрыть
                </button>
            </div>
        );
    }
}

(window as unknown as Record<string, unknown>).ModalWithLeak = ModalWithLeak;

export function ModalLeakExample() {
    const [isOpen, setIsOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const [closeCount, setCloseCount] = useState(0);

    const handleOpen = () => {
        setIsOpen(true);
        setOpenCount((n) => n + 1);
    };

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setCloseCount((n) => n + 1);
    }, []);

    return (
        <div style={blockStyle}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <button disabled={isOpen} onClick={handleOpen} style={isOpen ? buttonDisabledStyle : buttonStyle} type="button">
                    Открыть окно
                </button>
                <span style={metaTextStyle}>
                    Открытий: {openCount} | Закрытий: {closeCount}
                </span>
            </div>

            {isOpen ? (
                <div onClick={handleClose} role="presentation" style={overlayStyle}>
                    <div onClick={stopPropagation} role="presentation">
                        <ModalWithLeak onClose={handleClose} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
