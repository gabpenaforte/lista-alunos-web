import React from "react";
import { useState } from "react";
import axios from "axios";
import { Grid, TextField, Button } from "@mui/material";

const FiltrosAlunos = ({ onFilter }) => {
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
      console.log("Response de filtro:", response.data);

      const alunos = response.data?.data?.alunos || [];

      if (Array.isArray(alunos)) {
        onFilter(alunos);
      } else {
        console.error("Resposta inválida do servidor:", response.data);
        alert("Formato de resposta inválido do servidor.");
      }
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

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            name="nome"
            label="Filtrar por Nome"
            value={filter.nome}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            name="email"
            label="Filtrar por Email"
            value={filter.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            name="cpf"
            label="Filtrar por CPF"
            value={filter.cpf}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Filtrando..." : "Filtrar"}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={1.5}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClear}
            fullWidth
            disabled={loading}
          >
            Limpar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FiltrosAlunos;
