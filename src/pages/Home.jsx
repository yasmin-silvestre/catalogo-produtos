import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";

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
    <div style={{ display: "flex", gap: "20px" }}>
      
      {/* SIDEBAR */}
      <Sidebar categorias={categorias} setCategoria={setCategoria} />

      {/* CONTEÚDO */}
      <div className="container">
        <h1>Produtos</h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid">
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