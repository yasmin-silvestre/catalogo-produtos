const BASE_URL = "https://fakestoreapi.com";

export const api = {
  getProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error("Erro ao carregar produtos.");
    return res.json();
  },
  getProductById: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Produto não encontrado.");
    return res.json();
  }
};