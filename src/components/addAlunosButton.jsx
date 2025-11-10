import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import AlunoDialog from "./dialogs/alunoDialog";

const AddAlunosButton = ({ setAlunos }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", cpf: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
    setFormErrors({});
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ nome: "", email: "", cpf: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/alunos/create",
        formData
      );

      const aluno =
        response.data?.data?.aluno || response.data?.data || response.data;

      setAlunos((prev) => [aluno, ...prev]);
      handleClose();
      alert("Aluno cadastrado com sucesso!");
    } catch (err) {
      setFormErrors({
        apiError: err.response?.data?.message || "Erro ao criar aluno.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Cadastrar Aluno
      </Button>

      <AlunoDialog
        open={open}
        title="Cadastro de Aluno"
        description="Entre com as informações do aluno para cadastrá-lo."
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        formErrors={formErrors}
        submitting={loading}
        formId="create-aluno-form"
        submitLabel="Adicionar"
      />
    </>
  );
};

export default AddAlunosButton;
