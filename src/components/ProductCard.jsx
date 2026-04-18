import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import "./LiquidButton.css"; // Importando para usar no botão

function ProductCard({ produto }) {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ background: "#fff", padding: "15px", borderRadius: "10px", textAlign: "center", border: "1px solid #ddd" }}>
      <img 
        src={produto.image} 
        alt={produto.title} 
        style={{ height: "150px", objectFit: "contain", marginBottom: "10px", cursor: "pointer" }}
        onClick={() => navigate(`/product/${produto.id}`)} 
      />
      
      <h3 style={{ color: "#222", fontSize: "16px", height: "45px", overflow: "hidden" }}>
        {produto.title}
      </h3>
      
      <p style={{ fontWeight: "bold", fontSize: "18px", color: "#3b45a1" }}>
        {produto.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>

      {/* O botão que tinha sumido volta aqui: */}
      <button 
        onClick={() => navigate(`/product/${produto.id}`)} 
        className="liquid-button" 
        style={{ width: "100%", marginTop: "10px" }}
      >
        Ver Detalhes
      </button>
    </div>
  );
}

export default ProductCard;