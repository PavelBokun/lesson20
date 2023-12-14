import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton/IconButton";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { useActions } from "common/hooks/useActions";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/model/tasks/todolists/todolists.reducer";
import React, { useCallback } from "react";

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({todolist}:Props) => {
  const { removeTodolist, changeTodolistTitle } =
    useActions(todolistsThunks);

  const removeTodolistHandler = () => {
    removeTodolist(todolist.id);
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({id:todolist.id, title});
    },
    [todolist.id, changeTodolistTitle],
  );

  return (
    <h3>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
