import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./LiquidButton.css"; // Importando o estilo dos botões

function Header() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 40px", background: "#3b45a1", color: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      <h2 onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", margin: 0 }}> 
        <span style={{ fontSize: "28px" }}>🛒</span> Minha Loja
      </h2>
      
      {/* Área do carrinho estilizada como um botão de vidro */}
      <div 
        onClick={() => navigate("/cart")} 
        className="liquid-button"
        style={{ cursor: "pointer", fontSize: "16px", padding: "10px 20px" }}
      >
        <span>Meu Carrinho</span>
        <span style={{ background: "white", color: "#3b45a1", padding: "2px 10px", borderRadius: "15px", fontWeight: "bold", marginLeft: "5px" }}>
          {cartCount}
        </span>
      </div>
    </header>
  );
}

export default Header;