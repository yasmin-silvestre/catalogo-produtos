import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "../components/LiquidButton.css";

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, totalValue } = useCart();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowModal(true);
  };

  const closeAndClear = () => {
    setShowModal(false);
    clearCart();
    navigate("/");
  };

  return (
    <div className="container" style={{ padding: "40px", position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
        <h1 style={{ color: "#111" }}>Seu Carrinho</h1>
        <button onClick={() => navigate("/")} className="liquid-button">
          ← CONTINUAR COMPRANDO
        </button>
      </div>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "20px", color: "#666" }}>Carrinho vazio.</p>
      ) : (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #eee" }}>
                {/* Cabeçalho da Imagem adicionado */}
                <th style={{ textAlign: "left", padding: "15px", color: "#111" }}>Foto</th>
                <th style={{ textAlign: "left", padding: "15px", color: "#111" }}>Produto</th>
                <th style={{ padding: "15px", color: "#111" }}>Qtd</th>
                <th style={{ padding: "15px", color: "#111" }}>Subtotal</th>
                <th style={{ padding: "15px", color: "#111" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                  {/* Célula da Imagem adicionada */}
                  <td style={{ padding: "15px" }}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "8px" }} 
                    />
                  </td>
                  <td style={{ padding: "15px", color: "#333", fontWeight: "600" }}>{item.title}</td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                      <button onClick={() => removeFromCart(item.id, true)} className="liquid-button btn-qty">-</button>
                      <span style={{ fontWeight: "bold", fontSize: "18px" }}>{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="liquid-button btn-qty">+</button>
                    </div>
                  </td>
                  <td style={{ padding: "15px", textAlign: "center", fontWeight: "bold" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button onClick={() => removeFromCart(item.id)} className="liquid-button btn-danger">EXCLUIR</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "30px", textAlign: "right", padding: "20px", borderTop: "2px solid #eee" }}>
            <h2 style={{ color: "#111", fontSize: "28px" }}>Total: ${totalValue.toFixed(2)}</h2>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" }}>
              <button onClick={clearCart} className="liquid-button btn-danger">LIMPAR TUDO</button>
              <button onClick={handleCheckout} className="liquid-button btn-success">FINALIZAR COMPRA</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            maxWidth: "400px",
            width: "90%"
          }}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
            <h2 style={{ color: "#111", marginBottom: "10px" }}>Compra Realizada!</h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>Seu pedido foi processado com sucesso.</p>
            <button onClick={closeAndClear} className="liquid-button btn-success" style={{ width: "100%" }}>
              FECHAR E VOLTAR À LOJA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;