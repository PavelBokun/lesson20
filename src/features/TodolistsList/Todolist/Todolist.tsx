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
import { FilterTasksButton } from "features/TodolistsList/Todolist/FilterTasksButton/FilterTasksButton";
import { Tasks } from "features/TodolistsList/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  };

export const Todolist = React.memo(function ({ todolist, tasks}: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskcb = useCallback(
    (title: string) => {
      // addTask(title, todolist.id);
      addTask({ title, todolistId: todolist.id });
    },
    [todolist.id],
  );

  return (
    <>
      {/* Title */}
      <TodolistTitle todolist={todolist}  />
      <AddItemForm addItem={addTaskcb} disabled={todolist.entityStatus === "loading"} />
      {/* Tasks */}
      <Tasks todolist={todolist} tasks={tasks} />
      <div style={{ paddingTop: "10px" }}>
        {/* Button */}
        <FilterTasksButton todolist={todolist} />
      </div>
    </>
  );
});
