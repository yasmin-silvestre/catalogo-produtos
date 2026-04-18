import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { useProducts } from "../hooks/useProducts";

function Home() {
  const { produtos, loading, error } = useProducts();
  const [categoria, setCategoria] = useState("all");

  const produtosFiltrados = categoria === "all" 
    ? produtos 
    : produtos.filter(p => p.category === categoria);

  return (
    <div style={{ 
      display: "flex", 
      gap: "20px", 
      padding: "20px", 
      width: "100%", 
      boxSizing: "border-box",
      minHeight: "100vh"
    }}>
      <Sidebar 
        categorias={["all", ...new Set(produtos.map(p => p.category))]} 
        setCategoria={setCategoria} 
      />

      <div className="container" style={{ flex: 1 }}>
        <h1 style={{ 
          color: "#1a1a1a", 
          marginBottom: "30px", 
          paddingBottom: "10px",
          borderBottom: "3px solid #3b45a1", 
          display: "block",
          width: "fit-content", 
          margin: "20px auto" /* Centraliza o h1 horizontalmente */
        }}>
          Produtos
        </h1>

        {error && <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}

        {loading ? <Spinner /> : (
          <div className="grid" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
            gap: "20px" 
          }}>
            {produtosFiltrados.map(prod => (
              <ProductCard key={prod.id} produto={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;