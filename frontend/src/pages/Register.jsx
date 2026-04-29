import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import img from '../assets/logo.png';


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        try {
            await api.post('/auth/register', { name, email, password });
            setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            if (err.response?.status === 400) {
                setError('E-mail já cadastrado');
            } else {
                setError('Erro ao cadastrar. Tente novamente.');
            }
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <div className="card">
                <img src={img} alt="Register" className="login-image" style={{ width: '400px', height: '400px', marginRight: '0.5rem' }} />
                <h2>Criar Conta</h2>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '1rem' }}
                    />
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
                        placeholder="Senha (mínimo 6 caracteres)"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '1rem' }}
                    />
                    <input
                        type="password"
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: '1rem' }}
                    />
                    <button type="submit" style={{ width: '100%' }}>Cadastrar</button>
                </form>
                <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Já tem uma conta? <Link to="/login">Faça login</Link>
                </p>
            </div>
        </div>
    );
}