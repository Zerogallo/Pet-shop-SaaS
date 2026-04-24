import { Link } from 'react-router-dom';

export default function Dashboard() {
    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Painel do Pet Shop</h1>
                <button onClick={logout}>Sair</button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                <Link to="/agenda"><button>📅 Agendamentos</button></Link>
                <Link to="/pets"><button>🐾 Pets & Prontuário</button></Link>
                <Link to="/produtos"><button>📦 Produtos</button></Link>
            </div>
        </div>
    );
}