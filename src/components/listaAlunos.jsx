import * as React from "react";
import axios from "axios";
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListaAlunos = ({ alunos, loading, error, setAlunos }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleEditClick = (aluno) => {
    setSelectedAluno(aluno);
    setFormData({
      nome: aluno.nome,
      email: aluno.email,
      cpf: aluno.cpf,
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedAluno(null);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAluno) return;

    try {
      setSubmitting(true);
      const response = await axios.patch(
        `http://localhost:3000/api/alunos/update/${selectedAluno._id}`,
        formData
      );

      const updatedAluno =
        response.data?.data?.aluno || response.data?.data || response.data;

      setAlunos((prev) =>
        prev.map((aluno) =>
          aluno._id === updatedAluno._id ? updatedAluno : aluno
        )
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
    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o aluno ${aluno.nome}?`
    );
    if (!confirmar) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/alunos/delete/${aluno._id}`
      );
      setAlunos((prev) => prev.filter((a) => a._id !== aluno._id));
      alert("Aluno excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir aluno:", err);
      alert("Erro ao excluir aluno.");
    }
  };

  if (loading) return <p>Carregando informações...</p>;
  if (error) return <p>Erro ao carregar alunos.</p>;

  if (!Array.isArray(alunos) || alunos.length === 0) {
    return <p>Nenhum aluno encontrado.</p>;
  }

  return (
    <>
      <Grid container spacing={2} className="mt-4">
        {alunos.map((aluno) => (
          <Grid item xs={12} sm={6} md={4} key={aluno._id || aluno.cpf}>
            <Card
              variant="outlined"
              className="shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent>
                <div className="flex justify-between items-start">
                  <div>
                    <Typography variant="h6">{aluno.nome}</Typography>
                    <Typography color="text.secondary">
                      {aluno.email}
                    </Typography>
                    <Typography color="text.secondary">{aluno.cpf}</Typography>
                  </div>

                  <div>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(aluno)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(aluno)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Editar Aluno</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit} id="edit-form">
            <TextField
              margin="dense"
              name="nome"
              label="Nome"
              fullWidth
              value={formData.nome}
              onChange={handleEditChange}
              variant="standard"
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleEditChange}
              variant="standard"
            />
            <TextField
              margin="dense"
              name="cpf"
              label="CPF"
              fullWidth
              value={formData.cpf}
              onChange={handleEditChange}
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancelar</Button>
          <Button
            type="submit"
            form="edit-form"
            disabled={submitting}
            variant="contained"
          >
            {submitting ? "Salvando..." : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListaAlunos;
