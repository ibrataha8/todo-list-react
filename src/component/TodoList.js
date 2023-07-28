import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ToggleButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import { useState, useEffect, useMemo } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
const initialTodos = [
  {
    id: uuidv4(),
    title: "first",
    details: "First DETAILS",
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: "second",
    details: "second DETAILS",
    isComplete: false,
  },
  {
    id: uuidv4(),
    title: "third",
    details: "third DETAILS",
    isComplete: false,
  },
];
export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  const [displayTodosType, setDisplayTodosType] = useState("all");

  function handleCheckClick(todoId) {
    const updatedTodos = todos.map(t => {
      if (t.id === todoId) {
        t.isComplete = !t.isComplete;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function suppClickTodo(todoId) {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function updateClickTodo(todoId, obj) {
    const updatedTodos = todos.map(t => {
      if (t.id === todoId) {
        console.log(obj);
        return { ...t, title: obj.title, details: obj.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    console.log("first");
  }

  function changeDiplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  let todosBeRendre = todos;

  // Todos Complete
  const todosComplet = useMemo(() => {
    return todos.filter(todo => {
      console.log("todosComplet");
      return todo.isComplete;
    });
  },[todos]);
  
  // Todos Non Complete
  const todosNonComplet = useMemo(() => {
    return todos.filter(todo => {
      console.log("todosNonComplet");
      return ! todo.isComplete;
    });
  },[todos]);


  if (displayTodosType === "pas-fini") {
    todosBeRendre = todosNonComplet;
  } else if (displayTodosType === "fini") {
    todosBeRendre = todosComplet;
  } else {
    todosBeRendre = todos;
  }

  const todoJsx = todosBeRendre.map(todo => {
    return (
      <Todo
        key={todo.id}
        // title={todo.title}
        // details={todo.details}
        todo={todo}
        handleCheck={handleCheckClick}
        suppTodo={suppClickTodo}
        updateTodo={updateClickTodo}
      />
    );
  });

  handleCheckClick = () => {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isComplete: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card style={{ maxHeight: "90vh", overflow: "auto" }}>
          <CardContent>
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Todos
            </Typography>
            <Divider />
            {/* Filter Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "17px",
              }}
            >
              <ToggleButtonGroup
                value={displayTodosType}
                onChange={changeDiplayedType}
              >
                <ToggleButton value="pas-fini">Pas Fini</ToggleButton>
                <ToggleButton value="fini">Fini</ToggleButton>
                <ToggleButton value="all">Tout</ToggleButton>
              </ToggleButtonGroup>
            </div>
            {/* === Filter Button === */}
            {/* All Todos */}
            {todoJsx}
            {/* === All Todos === */}
            {/* Input + Button */}

            <CardContent style={{ marginTop: "10px" }}>
              <Grid container spacing={1}>
                <Grid xs={8}>
                  <TextField
                    style={{ width: "100%" }}
                    id="standard-basic"
                    label="Nouveux Task"
                    value={titleInput}
                    onChange={e => {
                      setTitleInput(e.target.value);
                    }}
                    variant="standard"
                  />{" "}
                </Grid>
                <Grid xs={4}>
                  <Button
                    onClick={handleCheckClick}
                    sx={{ width: "100%", height: "100%" }}
                    variant="contained"
                    disabled={titleInput.length === 0}
                  >
                    Ajouter
                  </Button>
                </Grid>
              </Grid>
            </CardContent>

            {/* === Input + Button === */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
