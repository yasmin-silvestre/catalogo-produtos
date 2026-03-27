import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("all");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProdutos(data);
        setLoading(false);
      });
  }, []);

  const categorias = ["all", ...new Set(produtos.map(p => p.category))];

  const produtosFiltrados =
    categoria === "all"
      ? produtos
      : produtos.filter(p => p.category === categoria);

  return (
    <div className="container">
      <h1>Produtos</h1>

      {/* FILTRO */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            style={{ margin: "5px" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading">Carregando...</p>
      ) : (
        <div className="grid">
          {produtosFiltrados.map(prod => (
            <ProductCard key={prod.id} produto={prod} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;