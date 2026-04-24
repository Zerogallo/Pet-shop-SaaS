import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

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
        <div className="container" style={{ maxWidth: '400px', marginTop: '5rem' }}>
            <div className="card">
                <h2>Login - Pet Shop</h2>
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
            </div>
        </div>
    );
}