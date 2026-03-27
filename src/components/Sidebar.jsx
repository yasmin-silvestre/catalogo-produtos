import "./Sidebar.css";

function Sidebar({ categorias, setCategoria }) {
  return (
    <div className="sidebar">
      <h3>Categorias</h3>

      {categorias.map(cat => (
        <button key={cat} onClick={() => setCategoria(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;