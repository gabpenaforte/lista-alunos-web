import React from "react";
import { TextField } from "@mui/material";

const AlunoForm = ({ formData, handleChange, formErrors = {} }) => {
  return (
    <>
      <TextField
        margin="dense"
        name="nome"
        label="Nome do Aluno"
        fullWidth
        required
        value={formData.nome}
        onChange={handleChange}
        variant="standard"
      />
      <TextField
        margin="dense"
        name="email"
        label="Email do Aluno"
        fullWidth
        required
        value={formData.email}
        onChange={handleChange}
        variant="standard"
      />
      <TextField
        margin="dense"
        name="cpf"
        label="CPF do Aluno"
        fullWidth
        required
        value={formData.cpf}
        onChange={handleChange}
        variant="standard"
      />
      {formErrors.apiError && (
        <div style={{ color: "red", marginTop: 8 }}>{formErrors.apiError}</div>
      )}
    </>
  );
};

export default AlunoForm;
