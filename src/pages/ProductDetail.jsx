import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import Spinner from "../components/Spinner";
import "../components/LiquidButton.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduto(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className="container" style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <button onClick={() => navigate("/")} className="liquid-button" style={{ marginBottom: "30px" }}>
        ← VOLTAR PARA PRODUTOS
      </button>

      {/* Ajustado: flex-wrap permite que o conteúdo desça caso o título seja muito grande em telas menores */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "40px", 
        alignItems: "flex-start", 
        background: "#ffffff", 
        padding: "40px", 
        borderRadius: "20px", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)" 
      }}>
        
        {/* Container da Imagem com tamanho fixo máximo para não sumir */}
        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          <img src={produto.image} style={{ maxWidth: "100%", height: "auto", maxHeight: "400px", objectFit: "contain" }} alt={produto.title} />
        </div>
        
        {/* Container do Texto: flex: 2 garante que ele tenha mais espaço para o título longo */}
        <div style={{ flex: "2 1 400px", minWidth: "300px" }}>
          <span style={{ textTransform: "uppercase", color: "#888", fontSize: "14px", fontWeight: "bold" }}>
            {produto.category}
          </span>
          
          {/* Título: Adicionado word-break para evitar que palavras muito longas quebrem o layout */}
          <h1 style={{ 
            color: "#111", 
            marginBottom: "15px", 
            fontSize: "2.5rem", 
            lineHeight: "1.2",
            wordBreak: "break-word",
            overflowWrap: "anywhere" 
          }}>
            {produto.title}
          </h1>
          
          <p style={{ color: "#444", fontSize: "1.1rem", marginBottom: "25px", lineHeight: "1.6" }}>
            {produto.description}
          </p>
          
          <h2 style={{ color: "#3b45a1", fontSize: "2.5rem", marginBottom: "30px", fontWeight: "bold" }}>
            {produto.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </h2>

          <button 
            onClick={() => addToCart(produto)}
            className="liquid-button"
            style={{ width: "100%", padding: "20px", fontSize: "1.2rem" }}
          >
            🛒 ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;