import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';
import useFetchData from '../utils/fetchData';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddAlunosButton() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', cpf: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { alunos, setAlunos } = useFetchData();

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

     try {
      const response = await axios.post(
        "http://localhost:3000/api/alunos/create",
        formData
      );

      const aluno = response.data.data;
      console.log("Aluno cadastrado com sucesso:", aluno);

      setAlunos([aluno, ...alunos]); 

      console.log("Aluno cadastrado com sucesso:", aluno);

    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Erro ao cadastrar aluno.";
      setFormErrors({ api: msg });
    } finally {
      setLoading(false);
    }
    handleClose();
  };

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