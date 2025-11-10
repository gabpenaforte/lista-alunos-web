import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/alunoCard.css";

const AlunoCard = ({ aluno, onEdit, onDelete }) => {
  return (
    <Card className="aluno-card">
      <CardContent className="aluno-card-content">
        <div className="aluno-info">
          <Typography variant="h6">{aluno.nome}</Typography>
          <Typography color="text.secondary">{aluno.email}</Typography>
          <Typography color="text.secondary">{aluno.cpf}</Typography>
        </div>
        <div className="aluno-actions">
          <IconButton color="primary" onClick={() => onEdit(aluno)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => onDelete(aluno)} size="small">
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlunoCard;
