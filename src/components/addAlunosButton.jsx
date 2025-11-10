import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddAlunosButton({ setAlunos }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", email: "", cpf: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setFormErrors({ apiError: "" });
  };

  const handleClose = () => {
    setOpen(false);
    setFormErrors({});
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
      console.log("Aluno cadastrado com sucesso:", aluno);

      handleClose();
      alert("Aluno cadastrado com sucesso!");
      setAlunos((prevAlunos) => [aluno, ...prevAlunos]);
    } catch (error) {
      const msg = error.response?.data?.message || "Erro ao criar aluno.";
      setFormErrors({ apiError: msg });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Carregando informações...</p>;
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Cadastrar Aluno
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastro do Aluno</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Entre com as informações do aluno para cadastrá-lo na lista.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="nome"
              label="Nome do Aluno"
              type="name"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email do Aluno"
              type="email"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="cpf"
              name="cpf"
              label="CPF do Aluno"
              placeholder="000.000.000-00"
              type="text"
              fullWidth
              onChange={handleChange}
              variant="standard"
            />
            {formErrors.apiError && (
              <div style={{ color: "red" }}>{formErrors.apiError}</div>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" form="subscription-form">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
