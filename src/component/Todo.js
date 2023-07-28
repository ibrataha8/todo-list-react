import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import "./todo.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";

//Dialog
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ todo, handleCheck, suppTodo, updateTodo }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    description: todo.details,
  });

  function handleCheckClick() {
    handleCheck(todo.id);
  }

  function suppClickTodo() {
    setOpenDialog(true);
  }

  function confirmDelete() {
    suppTodo(todo.id);
  }

  function handleUpdateClick() {
    setOpenDialogUpdate(true);
  }

  function confirmUpdate() {
    updateTodo(todo.id, updatedTodo);
    setOpenDialogUpdate(false);
  }

  return (
    <>
      {/* Dialog */}
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tu ne recupere pas les suupression
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button autoFocus onClick={confirmDelete}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      {/* // Dilog */}
      {/* Dialog Update */}
      <Dialog open={openDialogUpdate}>
        <DialogTitle>Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={e => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={e => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialogUpdate(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={confirmUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* // Dilog */}
      <Card
        sx={{ minWidth: 275 }}
        style={{ background: "#039be5", marginTop: "10px" }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography
                variant="h5"
                style={{
                  textDecoration: todo.isComplete
                    ? "line-through white"
                    : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                style={{
                  textDecoration: todo.isComplete
                    ? "line-through white"
                    : "none",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <IconButton
                className="iconBtn"
                onClick={suppClickTodo}
                style={{
                  color: "red",
                  background: "white",
                  border: "3px solid red",
                }}
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                className="iconBtn"
                onClick={handleCheckClick}
                style={{
                  color: todo.isComplete ? "white" : "green",
                  background: todo.isComplete ? "green" : "white",
                  border: "3px solid green",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className="iconBtn"
                onClick={handleUpdateClick}
                style={{
                  color: "blue",
                  background: "white",
                  border: "3px solid blue",
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
