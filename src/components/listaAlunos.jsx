import React, { useState } from "react";
import axios from "axios";
import FiltrosAlunos from "./filtrosAlunos";
import AlunoDialog from "./dialogs/alunoDialog";
import AlunoCard from "./alunoCard";
import "./styles/listaAlunos.css";

const ListaAlunos = ({ alunos, loading, error, setAlunos }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [formData, setFormData] = useState({ nome: "", email: "", cpf: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleEditClick = (aluno) => {
    setSelectedAluno(aluno);
    setFormData({ nome: aluno.nome, email: aluno.email, cpf: aluno.cpf });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedAluno(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAluno) return;
    setSubmitting(true);

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/alunos/update/${selectedAluno._id}`,
        formData
      );

      const updatedAluno =
        response.data?.data?.aluno || response.data?.data || response.data;

      setAlunos((prev) =>
        prev.map((a) => (a._id === updatedAluno._id ? updatedAluno : a))
      );

      handleEditClose();
      alert("Aluno atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar aluno:", err);
      alert("Erro ao atualizar aluno.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (aluno) => {
    if (!window.confirm(`Excluir o aluno ${aluno.nome}?`)) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/alunos/delete/${aluno._id}`
      );
      setAlunos((prev) => prev.filter((a) => a._id !== aluno._id));
    } catch (err) {
      console.error("Erro ao excluir aluno:", err);
      alert("Erro ao excluir aluno.");
    }
  };

  if (loading) return <p>Carregando informações...</p>;
  if (error) return <p>Erro ao carregar alunos.</p>;

  return (
    <>
      <FiltrosAlunos onFilter={setAlunos} />

      <div className="lista-alunos">
        {alunos.map((aluno) => (
          <AlunoCard
            key={aluno._id || aluno.cpf}
            aluno={aluno}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <AlunoDialog
        open={openEdit}
        title="Editar Aluno"
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleEditSubmit}
        handleClose={handleEditClose}
        submitting={submitting}
        formId="edit-aluno-form"
        submitLabel="Salvar"
      />
    </>
  );
};

export default ListaAlunos;
