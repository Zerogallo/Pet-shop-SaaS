import { useNavigate, Link } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header style={{
            background: '#2c7da0',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <h2>🐾 PetShop Manager</h2>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                <Link to="/agenda" style={{ color: 'white', textDecoration: 'none' }}>Agenda</Link>
                <Link to="/pets" style={{ color: 'white', textDecoration: 'none' }}>Pets</Link>
                <Link to="/produtos" style={{ color: 'white', textDecoration: 'none' }}>Produtos</Link>
                <button onClick={logout} style={{ background: '#1f5e7a', border: 'none', padding: '0.3rem 0.8rem' }}>Sair</button>
            </nav>
        </header>
    );
}