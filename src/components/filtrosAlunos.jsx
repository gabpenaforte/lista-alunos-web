import React from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useFiltrosAlunos } from "../hooks/useFiltrosAlunos";

const FiltrosAlunos = ({ onFilter }) => {
  const { filter, loading, handleChange, handleSubmit, handleClear } =
    useFiltrosAlunos(onFilter);

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

        <Grid item xs={12} sm={6} md={1.5}>
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
