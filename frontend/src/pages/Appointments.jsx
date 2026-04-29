import { useEffect, useState } from 'react';
import api from '../services/api';
import { TfiAgenda } from 'react-icons/tfi';

export default function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [pets, setPets] = useState([]);
    const [form, setForm] = useState({ petId: '', date: '', time: '', service: '' });

    useEffect(() => {
        loadAppointments();
        api.get('/pets').then(res => setPets(res.data));
    }, []);

    const loadAppointments = async () => {
        const res = await api.get('/appointments');
        setAppointments(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/appointments', form);
        setForm({ petId: '', date: '', time: '', service: '' });
        loadAppointments();
    };

    return (
        <div className="container">
            <h2><TfiAgenda /> Agendamentos</h2>
            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <select value={form.petId} onChange={e => setForm({ ...form, petId: e.target.value })} required>
                        <option value="">Selecione o pet</option>
                        {pets.map(pet => (
                            <option key={pet.id} value={pet.id}>{pet.name}</option>
                        ))}
                    </select>
                    <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                    <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
                    <input placeholder="Serviço" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} required />
                    <button type="submit"><TfiAgenda /> Agendar</button>
                </form>
            </div>
            {appointments.map(apt => (
                <div key={apt.id} className="card">
                    <strong>{apt.date} às {apt.time}</strong> – {apt.service}<br />
                    Pet: {apt.pet?.name} | Status: {apt.status}
                </div>
            ))}
        </div>
    );
}