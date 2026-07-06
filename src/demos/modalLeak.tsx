import React, { PureComponent, useCallback, useState } from "react";

const blockStyle: React.CSSProperties = {
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
};

const buttonStyle: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: 6,
    border: "1px solid #94a3b8",
    background: "#f1f5f9",
    cursor: "pointer",
};

const closeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#b91c1c",
};

const pStyle: React.CSSProperties = { margin: "0 0 12px", fontSize: "0.9em", color: "#64748b" };

const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    minWidth: 340,
    maxWidth: 480,
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
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
                <h3 style={{ margin: "0 0 12px" }}>Modal</h3>
                <p style={pStyle}>
                    Подписывается на <code>beforeunload</code> и <code>pagehide</code> при монтировании, но никогда не
                    отписывается при размонтировании.
                </p>
                <p style={pStyle}>
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
                <button disabled={isOpen} onClick={handleOpen} style={buttonStyle} type="button">
                    Open modal
                </button>
                <span style={{ fontSize: "0.85em", color: "#64748b" }}>
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
