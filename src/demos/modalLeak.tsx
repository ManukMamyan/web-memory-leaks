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

/**
 * Утечка намеренно: beforeunload/pagehide без removeEventListener;
 * callback ref сохраняет последний DOM-узел, когда el равен null (никогда не очищается).
 */
export class LeakyModalContent extends PureComponent<{ onClose: () => void }> {
    static displayName = "LeakyModalContent";

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
                <h3 style={modalTitleStyle}>Modal</h3>
                <p style={modalPStyle}>
                    Подписывается на <code>beforeunload</code> и <code>pagehide</code> при монтировании, но никогда не
                    отписывается при размонтировании.
                </p>
                <p style={modalPStyle}>
                    Callback ref сохраняет элемент при монтировании и не очищает <code>domNode</code>, когда React
                    передаёт <code>null</code> — последний DOM-поддерево может оставаться отключённым, но
                    удерживаемым.
                </p>
                <button onClick={this.props.onClose} style={closeButtonStyle} type="button">
                    Close
                </button>
            </div>
        );
    }
}

(window as unknown as Record<string, unknown>).LeakyModalContent = LeakyModalContent;

export function ModalLeakDemo() {
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
                    Открыть модальное окно
                </button>
                <span style={metaTextStyle}>
                    Opens: {openCount} | Closes: {closeCount}
                </span>
            </div>

            {isOpen ? (
                <div onClick={handleClose} role="presentation" style={overlayStyle}>
                    <div onClick={stopPropagation} role="presentation">
                        <LeakyModalContent onClose={handleClose} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
