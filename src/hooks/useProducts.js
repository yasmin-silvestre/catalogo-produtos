import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useProducts() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getProducts()
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { produtos, loading, error };
}