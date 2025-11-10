import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AlunoCard = ({ aluno, onEdit, onDelete }) => {
  return (
    <Card
      variant="outlined"
      className="shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <CardContent>
        <div className="flex justify-between items-start">
          <div>
            <Typography variant="h6">{aluno.nome}</Typography>
            <Typography color="text.secondary">{aluno.email}</Typography>
            <Typography color="text.secondary">{aluno.cpf}</Typography>
          </div>

          <div>
            <IconButton
              color="primary"
              onClick={() => onEdit(aluno)}
              size="small"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => onDelete(aluno)}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlunoCard;
