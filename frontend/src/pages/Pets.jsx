import { useEffect, useState } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';

export default function Pets() {
    const [pets, setPets] = useState([]);
    const [newPet, setNewPet] = useState({ name: '', species: '', breed: '', birthDate: '', ownerName: '' });
    const [medicalRecord, setMedicalRecord] = useState({ description: '', prescription: '', veterinarian: '' });
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        loadPets();
    }, []);

    const loadPets = async () => {
        const res = await api.get('/pets');
        setPets(res.data);
    };

    const addPet = async () => {
        await api.post('/pets', newPet);
        setNewPet({ name: '', species: '', breed: '', birthDate: '', ownerName: '' });
        loadPets();
    };

    const addMedicalRecord = async (petId) => {
        await api.post(`/pets/${petId}/medical-records`, medicalRecord);
        setMedicalRecord({ description: '', prescription: '', veterinarian: '' });
        loadPets();
        setSelectedPet(null);
    };

    // ... dentro do componente
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPet, setCurrentPet] = useState(null);

    return (
        <div className="container">
            <h2>Pets</h2>
            <div className="card">
                <h3>Novo Pet</h3>
                <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))' }}>
                    <input placeholder="Nome" value={newPet.name} onChange={e => setNewPet({ ...newPet, name: e.target.value })} />
                    <input placeholder="Espécie" value={newPet.species} onChange={e => setNewPet({ ...newPet, species: e.target.value })} />
                    <input placeholder="Raça" value={newPet.breed} onChange={e => setNewPet({ ...newPet, breed: e.target.value })} />
                    <input type="date" placeholder="Nascimento" value={newPet.birthDate} onChange={e => setNewPet({ ...newPet, birthDate: e.target.value })} />
                    <input placeholder="Dono" value={newPet.ownerName} onChange={e => setNewPet({ ...newPet, ownerName: e.target.value })} />
                    <button onClick={addPet}>Adicionar</button>
                </div>
            </div>

            {pets.map(pet => (
                <div key={pet.id} className="card">
                    <h3>{pet.name} ({pet.species}) – {pet.ownerName}</h3>
                    <button onClick={() => setSelectedPet(pet)}>Adicionar registro médico</button>
                    {pet.medicalRecords?.length > 0 && (
                        <>
                            <h4>Prontuário</h4>
                            {pet.medicalRecords.map(rec => (
                                <div key={rec.id} style={{ borderLeft: '3px solid #2c7da0', paddingLeft: '0.5rem', marginTop: '0.5rem' }}>
                                    <strong>{rec.date}</strong> – {rec.description}<br />
                                    {rec.prescription && `Receita: ${rec.prescription}`}<br />
                                    {rec.veterinarian && `Vet: ${rec.veterinarian}`}
                                </div>
                            ))}
                        </>
                    )}
                    {selectedPet?.id === pet.id && (
                        <div style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                            <textarea placeholder="Descrição (sintomas/diagnóstico)" value={medicalRecord.description} onChange={e => setMedicalRecord({ ...medicalRecord, description: e.target.value })} />
                            <input placeholder="Prescrição" value={medicalRecord.prescription} onChange={e => setMedicalRecord({ ...medicalRecord, prescription: e.target.value })} />
                            <input placeholder="Veterinário" value={medicalRecord.veterinarian} onChange={e => setMedicalRecord({ ...medicalRecord, veterinarian: e.target.value })} />
                            <button onClick={() => addMedicalRecord(pet.id)}>Salvar Registro</button>
                        </div>
                    )}

                    // No JSX:
                    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Registro Médico">
                        <textarea placeholder="Descrição" />
                        <button onClick={() => addMedicalRecord(currentPet.id)}>Salvar</button>
                    </Modal>
                </div>
            ))}
        </div>
    );
}