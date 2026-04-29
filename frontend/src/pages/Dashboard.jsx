import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { TfiAgenda } from 'react-icons/tfi';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineExitToApp, MdOutlinePets } from 'react-icons/md';
import { CiBoxes } from 'react-icons/ci';

export default function Dashboard() {
    const [recentPets, setRecentPets] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [petsRes, productsRes, appointmentsRes] = await Promise.all([
                    api.get('/pets'),
                    api.get('/products'),
                    api.get('/appointments')
                ]);

                // Últimos 5 pets cadastrados (por ID decrescente)
                const sortedPets = petsRes.data.sort((a, b) => b.id - a.id).slice(0, 5);
                setRecentPets(sortedPets);

                // Últimos 5 produtos cadastrados (por ID decrescente)
                const sortedProducts = productsRes.data.sort((a, b) => b.id - a.id).slice(0, 5);
                setRecentProducts(sortedProducts);

                // Próximos agendamentos (data >= hoje, ordenado por data e hora)
                const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
                const upcoming = appointmentsRes.data
                    .filter(apt => apt.date >= today)
                    .sort((a, b) => {
                        if (a.date === b.date) return a.time.localeCompare(b.time);
                        return a.date.localeCompare(b.date);
                    })
                    .slice(0, 5);
                setUpcomingAppointments(upcoming);
            } catch (error) {
                console.error('Erro ao carregar dados do dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1><RxDashboard />  Painel do Pet Shop</h1>

            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <Link to="/agenda"><button><TfiAgenda /> Agendamentos</button></Link>
                <Link to="/pets"><button><MdOutlinePets /> Pets & Prontuário</button></Link>
                <Link to="/produtos"><button><CiBoxes /> Produtos</button></Link>
            </div>

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {/* Card: Últimos pets */}
                    <div className="card">
                        <h2><MdOutlinePets /> Últimos pets</h2>
                        {recentPets.length === 0 ? (
                            <p>Nenhum pet cadastrado ainda.</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {recentPets.map(pet => (
                                    <li key={pet.id} style={{
                                        padding: '0.75rem 0',
                                        borderBottom: '1px solid #e2e8f0',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <span><strong>{pet.name}</strong> ({pet.species})</span>
                                        <span style={{ color: '#64748b' }}>{pet.ownerName}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Link to="/pets" style={{ display: 'inline-block', marginTop: '1rem', color: '#2c7da0' }}>
                            Ver todos →
                        </Link>
                    </div>

                    {/* Card: Últimos produtos */}
                    <div className="card">
                        <h2><CiBoxes /> Últimos produtos</h2>
                        {recentProducts.length === 0 ? (
                            <p>Nenhum produto cadastrado ainda.</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {recentProducts.map(product => (
                                    <li key={product.id} style={{
                                        padding: '0.75rem 0',
                                        borderBottom: '1px solid #e2e8f0',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <span><strong>{product.name}</strong> ({product.category})</span>
                                        <span style={{ color: '#64748b' }}>R$ {product.price}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Link to="/produtos" style={{ display: 'inline-block', marginTop: '1rem', color: '#2c7da0' }}>
                            Ver todos →
                        </Link>
                    </div>

                    {/* Card: Próximos agendamentos */}
                    <div className="card">
                        <h2><TfiAgenda /> Próximos agendamentos</h2>
                        {upcomingAppointments.length === 0 ? (
                            <p>Nenhum agendamento futuro.</p>
                        ) : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {upcomingAppointments.map(apt => (
                                    <li key={apt.id} style={{
                                        padding: '0.75rem 0',
                                        borderBottom: '1px solid #e2e8f0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap'
                                    }}>
                                        <span>
                                            <strong>{apt.date}</strong> às {apt.time}
                                        </span>
                                        <span>
                                            {apt.service} – {apt.pet?.name || 'Pet'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <Link to="/agenda" style={{ display: 'inline-block', marginTop: '1rem', color: '#2c7da0' }}>
                            Ver todos →
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}