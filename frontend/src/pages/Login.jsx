import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Link } from 'react-router-dom';

import img from '../assets/logo.png';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.access_token);
            navigate('/');
        } catch (err) {
            setError('E-mail ou senha inválidos');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <div className="card">
                <img src={img} alt="Login" className="login-image" style={{ width: '400px', height: '400px', marginRight: '0.5rem' }} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '1rem' }}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '1rem' }}
                    />
                    <button type="submit" style={{ width: '100%' }}>Entrar</button>


                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Não tem uma conta? <Link to="/register">Cadastre-se</Link>
                </p>
            </div>
        </div>
    );
}