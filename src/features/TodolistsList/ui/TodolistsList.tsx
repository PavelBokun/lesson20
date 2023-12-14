import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
// import { Todolist } from "../Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { TaskStatuses } from "common/enums";
import { Todolist } from "features/TodolistsList/Todolist/Todolist";
import {
  FilterValuesType,
  todolistsActions,
  todolistsThunks,
} from "features/TodolistsList/model/tasks/todolists/todolists.reducer";
import { selectTodolists } from "features/TodolistsList/model/tasks/todolists/todolists.selectors";
import { selectTasks } from "features/TodolistsList/tasks.selectors";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    // removeTodolist: removeTodolistThunk,
    addTodolist,
    fetchTodolists,
    // changeTodolistTitle: changeTodolistTitleThunk,
  } = useActions(todolistsThunks);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchTodolists();
  }, []);

  const addTodolistcb = useCallback((title: string) => {
    addTodolist(title);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistcb} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  // changeFilter={changeFilter}
                  // removeTodolist={removeTodolist}
                  // changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
