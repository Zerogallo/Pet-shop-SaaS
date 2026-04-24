export default function ProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="card" style={{ background: '#f8fafc' }}>
            <h4>{product.name}</h4>
            <p>Categoria: {product.category}</p>
            <p>Preço: R$ {product.price}</p>
            <p>Estoque: {product.stock}</p>
            <button onClick={() => onEdit(product)}>Editar</button>
            <button onClick={() => onDelete(product.id)} style={{ marginLeft: '0.5rem', background: '#dc2626' }}>Excluir</button>
        </div>
    );
}