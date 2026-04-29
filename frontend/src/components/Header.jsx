import { useNavigate, Link } from 'react-router-dom';
import img from '../assets/logo.png';
import { RxDashboard } from "react-icons/rx";
import { TfiAgenda } from "react-icons/tfi";
import { MdOutlinePets, MdOutlineExitToApp } from "react-icons/md";
import { CiBoxes } from "react-icons/ci";

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


            <img src={img} alt="Logo" style={{ width: '80px', height: '80px', marginRight: '0.5rem' }} />


            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}><RxDashboard /> Dashboard</Link>
                <Link to="/agenda" style={{ color: 'white', textDecoration: 'none' }}><TfiAgenda /> Agenda</Link>
                <Link to="/pets" style={{ color: 'white', textDecoration: 'none' }}><MdOutlinePets /> Pets</Link>
                <Link to="/produtos" style={{ color: 'white', textDecoration: 'none' }}><CiBoxes /> Produtos</Link>
                <button onClick={logout} style={{ background: '#1f5e7a', border: 'none', padding: '0.3rem 0.8rem' }}><MdOutlineExitToApp /> Sair</button>
            </nav>
        </header>
    );
}