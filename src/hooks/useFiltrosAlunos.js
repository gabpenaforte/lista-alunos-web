import { useState } from "react";
import axios from "axios";

export const useFiltrosAlunos = (onFilter) => {
  const [filter, setFilter] = useState({ nome: "", email: "", cpf: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.nome) params.append("nome", filter.nome);
      if (filter.email) params.append("email", filter.email);
      if (filter.cpf) params.append("cpf", filter.cpf);

      const response = await axios.get(
        `http://localhost:3000/api/alunos/filter?${params.toString()}`
      );
      const alunos = response.data?.data?.alunos || [];
      onFilter(alunos);
    } catch (err) {
      console.error("Erro ao buscar alunos com filtro:", err);
      alert("Erro ao buscar alunos.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setFilter({ nome: "", email: "", cpf: "" });
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/alunos");
      const alunos = response.data?.data?.alunos || [];
      onFilter(alunos);
    } catch (err) {
      console.error("Erro ao limpar filtros:", err);
      alert("Erro ao carregar lista completa de alunos.");
    } finally {
      setLoading(false);
    }
  };

  return { filter, loading, handleChange, handleSubmit, handleClear };
};
