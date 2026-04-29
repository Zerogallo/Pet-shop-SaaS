import { useEffect, useState } from 'react';
import api from '../services/api';
import { CiBoxes } from 'react-icons/ci';
import { SlPencil } from "react-icons/sl";
import { MdDelete } from 'react-icons/md';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', description: '' });
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const res = await api.get('/products');
        setProducts(res.data);
    };

    const handleSubmit = async () => {
        if (editing) {
            await api.put(`/products/${editing}`, form);
        } else {
            await api.post('/products', form);
        }
        setForm({ name: '', category: '', price: '', stock: '', description: '' });
        setEditing(null);
        loadProducts();
    };

    const deleteProduct = async (id) => {
        await api.delete(`/products/${id}`);
        loadProducts();
    };

    const editProduct = (product) => {
        setForm(product);
        setEditing(product.id);
    };

    return (
        <div className="container">
            <h2><CiBoxes /> Produtos</h2>
            <div className="card">
                <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))' }}>
                    <input placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input placeholder="Categoria" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                    <input type="number" placeholder="Preço" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                    <input type="number" placeholder="Estoque" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                    <input placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                    <button onClick={handleSubmit}>{editing ? 'Atualizar' : 'Adicionar'}</button>
                    {editing && <button onClick={() => { setEditing(null); setForm({ name: '', category: '', price: '', stock: '', description: '' }); }}>Cancelar</button>}
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px' }}>
                <thead>
                    <tr><th>Nome</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id} style={{ borderTop: '1px solid #ddd' }}>
                            <td>{p.name}</td><td>{p.category}</td><td>R$ {p.price}</td><td>{p.stock}</td>
                            <td><button onClick={() => editProduct(p)}><SlPencil /> Editar</button> <button onClick={() => deleteProduct(p.id)}><MdDelete /> Deletar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}