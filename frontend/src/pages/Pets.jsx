import { useEffect, useState } from 'react';
import api from '../services/api';
import { MdAppRegistration, MdOutlinePets } from 'react-icons/md';
import { FaBookBookmark, FaUserDoctor } from "react-icons/fa6";
import { GiRemedy } from "react-icons/gi";

export default function Pets() {
    const [pets, setPets] = useState([]);
    const [newPet, setNewPet] = useState({
        name: '',
        species: '',
        breed: '',
        birthDate: '',
        ownerName: ''
    });

    // Estado para os formulários de registro médico: cada pet tem seus próprios dados
    const [medicalForms, setMedicalForms] = useState({});
    // Controle de qual pet está com o formulário aberto
    const [openFormPetId, setOpenFormPetId] = useState(null);

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

    // Abre o formulário para um pet específico e inicializa os campos vazios
    const openMedicalForm = (petId) => {
        setOpenFormPetId(petId);
        setMedicalForms(prev => ({
            ...prev,
            [petId]: {
                date: new Date().toISOString().split('T')[0], // data atual como padrão
                description: '',
                prescription: '',
                veterinarian: ''
            }
        }));
    };

    // Fecha o formulário sem salvar
    const closeMedicalForm = () => {
        setOpenFormPetId(null);
    };

    // Atualiza um campo específico do formulário do pet
    const handleMedicalChange = (petId, field, value) => {
        setMedicalForms(prev => ({
            ...prev,
            [petId]: { ...prev[petId], [field]: value }
        }));
    };

    // Salva o registro médico
    const addMedicalRecord = async (petId) => {
        const recordData = medicalForms[petId];
        if (!recordData.description.trim()) {
            alert('A descrição é obrigatória');
            return;
        }
        await api.post(`/pets/${petId}/medical-records`, recordData);
        // Limpa o formulário para esse pet e fecha
        setMedicalForms(prev => {
            const newForms = { ...prev };
            delete newForms[petId];
            return newForms;
        });
        setOpenFormPetId(null);
        loadPets(); // recarrega para mostrar o novo registro
    };

    return (
        <div className="container">
            <h2><MdOutlinePets /> Pets & Prontuário</h2>

            {/* Formulário para adicionar novo pet */}
            <div className="card">
                <h3>Novo Pet</h3>
                <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))' }}>
                    <input placeholder="Nome" value={newPet.name} onChange={e => setNewPet({ ...newPet, name: e.target.value })} />
                    <input placeholder="Espécie" value={newPet.species} onChange={e => setNewPet({ ...newPet, species: e.target.value })} />
                    <input placeholder="Raça" value={newPet.breed} onChange={e => setNewPet({ ...newPet, breed: e.target.value })} />
                    <input type="date" placeholder="Nascimento" value={newPet.birthDate} onChange={e => setNewPet({ ...newPet, birthDate: e.target.value })} />
                    <input placeholder="Dono" value={newPet.ownerName} onChange={e => setNewPet({ ...newPet, ownerName: e.target.value })} />
                    <button onClick={addPet}>Adicionar Pet</button>
                </div>
            </div>

            {/* Lista de pets */}
            {pets.map(pet => (
                <div key={pet.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>{pet.name} <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>({pet.species} - {pet.breed})</span></h3>
                        <div>
                            <button onClick={() => openMedicalForm(pet.id)}><MdAppRegistration /> Adicionar registro médico</button>
                        </div>
                    </div>
                    <p><strong>Dono:</strong> {pet.ownerName} | <strong>Nascimento:</strong> {pet.birthDate}</p>

                    {/* Exibição dos registros médicos existentes */}
                    {pet.medicalRecords && pet.medicalRecords.length > 0 && (
                        <>
                            <h4><FaBookBookmark /> Prontuário</h4>
                            {pet.medicalRecords.map(rec => (
                                <div key={rec.id} style={{
                                    borderLeft: '3px solid #2c7da0',
                                    paddingLeft: '0.5rem',
                                    marginTop: '0.5rem',
                                    background: '#f8fafc',
                                    borderRadius: '8px',
                                    padding: '0.5rem'
                                }}>
                                    <strong>{rec.date}</strong> – {rec.description}<br />
                                    {rec.prescription && <span><GiRemedy /> Receita: {rec.prescription}<br /></span>}
                                    {rec.veterinarian && <span><FaUserDoctor /> Veterinário: {rec.veterinarian}</span>}
                                </div>
                            ))}
                        </>
                    )}

                    {/* Formulário de novo registro médico (aparece apenas para o pet selecionado) */}
                    {openFormPetId === pet.id && medicalForms[pet.id] && (
                        <div style={{
                            marginTop: '1rem',
                            borderTop: '1px solid #e2e8f0',
                            paddingTop: '1rem',
                            background: '#f1f5f9',
                            borderRadius: '12px',
                            padding: '1rem'
                        }}>
                            <h4>Novo registro para {pet.name}</h4>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label>Data do registro</label>
                                <input
                                    type="date"
                                    value={medicalForms[pet.id].date}
                                    onChange={e => handleMedicalChange(pet.id, 'date', e.target.value)}
                                />
                                <label>Descrição (diagnóstico/sintomas)</label>
                                <textarea
                                    rows="3"
                                    placeholder="Ex: Tosse, falta de apetite, febre..."
                                    value={medicalForms[pet.id].description}
                                    onChange={e => handleMedicalChange(pet.id, 'description', e.target.value)}
                                    required
                                />
                                <label>Prescrição (opcional)</label>
                                <input
                                    placeholder="Medicamentos, cuidados..."
                                    value={medicalForms[pet.id].prescription}
                                    onChange={e => handleMedicalChange(pet.id, 'prescription', e.target.value)}
                                />
                                <label>Veterinário responsável (opcional)</label>
                                <input
                                    placeholder="Nome do veterinário"
                                    value={medicalForms[pet.id].veterinarian}
                                    onChange={e => handleMedicalChange(pet.id, 'veterinarian', e.target.value)}
                                />
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button onClick={() => addMedicalRecord(pet.id)}>✅ Salvar registro</button>
                                    <button onClick={closeMedicalForm} style={{ background: '#94a3b8' }}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}