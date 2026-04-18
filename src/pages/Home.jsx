// src/pages/Home.jsx
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        if (!res.ok) throw new Error("Falha ao carregar os produtos.");
        return res.json();
      })
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const produtosFiltrados = categoria === "all" ? produtos : produtos.filter(p => p.category === categoria);

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <Sidebar categorias={["all", ...new Set(produtos.map(p => p.category))]} setCategoria={setCategoria} />

      <div className="container" style={{ flex: 1 }}>
        {/* Título com cor forte para legibilidade */}
        <h1 style={{ color: "#1a1a1a", marginBottom: "20px", borderBottom: "2px solid #3b45a1", display: "inline-block" }}>
          Produtos
        </h1>

        {error && <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}

        {loading ? <Spinner /> : (
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
            {produtosFiltrados.map(prod => (
              <div key={prod.id} className="product-card" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", textAlign: "center", background: "#fff" }}>
                <img src={prod.image} alt={prod.title} style={{ height: "150px", objectFit: "contain", marginBottom: "10px" }} />
                {/* Título do item com cor escura */}
                <h3 style={{ color: "#222", fontSize: "16px", height: "45px", overflow: "hidden" }}>{prod.title}</h3>
                <p style={{ fontWeight: "bold", fontSize: "18px", color: "#3b45a1" }}>${prod.price}</p>
                <button onClick={() => window.location.href=`/product/${prod.id}`} className="liquid-button" style={{ width: "100%", marginTop: "10px" }}>
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;