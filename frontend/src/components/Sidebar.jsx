import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside style={{
            width: '250px',
            background: '#1e293b',
            color: 'white',
            height: '100vh',
            padding: '1rem'
        }}>
            <h3>Menu</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><NavLink to="/" style={{ color: 'white', textDecoration: 'none' }}>📊 Dashboard</NavLink></li>
                <li><NavLink to="/agenda" style={{ color: 'white', textDecoration: 'none' }}>📅 Agendamentos</NavLink></li>
                <li><NavLink to="/pets" style={{ color: 'white', textDecoration: 'none' }}>🐕 Pets</NavLink></li>
                <li><NavLink to="/produtos" style={{ color: 'white', textDecoration: 'none' }}>📦 Produtos</NavLink></li>
            </ul>
        </aside>
    );
}