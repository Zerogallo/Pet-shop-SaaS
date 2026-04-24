export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                minWidth: '300px',
                maxWidth: '500px'
            }} onClick={e => e.stopPropagation()}>
                <h3>{title}</h3>
                {children}
                <button onClick={onClose} style={{ marginTop: '1rem' }}>Fechar</button>
            </div>
        </div>
    );
}