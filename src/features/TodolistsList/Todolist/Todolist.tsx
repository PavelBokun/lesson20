import React, { useCallback, useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { Task } from "./Task/Task";
import { FilterValuesType, TodolistDomainType } from "features/TodolistsList/model/tasks/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { TaskType } from "features/TodolistsList/api/todolists.api";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm, EditableSpan } from "common/components";
import { FilterTacksButton } from "features/TodolistsList/Todolist/Task/FilterTasksButton/FilterTasksButton";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  // changeFilter: (value: FilterValuesType, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};


export const Todolist = React.memo(function ({todolist,tasks,removeTodolist,changeTodolistTitle}: Props) {
  const { fetchTasks,addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskcb = useCallback(
    (title: string) => {
      // addTask(title, todolist.id);
      addTask({ title, todolistId:todolist.id });
    },
    [todolist.id],
    
  );

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle(todolist.id, title);
    },
    [todolist.id, changeTodolistTitle],
  );

  

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {/* Title */}
      <h3>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskcb} disabled={todolist.entityStatus === "loading"} />
      {/* Tasks */}
      <div>
        {tasksForTodolist.map((t) => (
          <Task key={t.id} task={t} todolistId={todolist.id} />
        ))}
        {/*Buttons*/}
      </div>
      <div style={{ paddingTop: "10px" }}>
       <FilterTacksButton todolist={todolist} />
      </div>
    </div>
  );
});
