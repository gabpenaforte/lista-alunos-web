import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import AlunoForm from "./alunoForm";

const AlunoDialog = ({
  open,
  title,
  description,
  formData,
  handleChange,
  handleSubmit,
  handleClose,
  formErrors,
  submitting,
  formId,
  submitLabel = "Salvar",
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        <form onSubmit={handleSubmit} id={formId}>
          <AlunoForm
            formData={formData}
            handleChange={handleChange}
            formErrors={formErrors}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          type="submit"
          form={formId}
          variant="contained"
          disabled={submitting}
        >
          {submitting ? "Salvando..." : submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlunoDialog;
