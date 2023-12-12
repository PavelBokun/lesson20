import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TaskType } from "features/TodolistsList/api/todolists.api";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasks.reducer";
import { useActions } from "common/hooks/useActions";
import s from "./Task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};

// const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
//   updateTask({ taskId, domainModel: { status }, todolistId });
// }, []);

// const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
//   updateTask({ taskId, domainModel: { title }, todolistId });
// }, []);

export const Task = React.memo(({ task, todolistId }: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const onClickHandler = () => removeTask({ taskId: task.id, todolistId: todolistId });

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({
      taskId: task.id,
      domainModel: { status },
      todolistId,
    });
  };

  const changeTitleHandler = useCallback(
    (title: string) => {
      updateTask({ taskId: task.id, domainModel: { title }, todolistId });
    },
    [task.id, todolistId],
  );

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTitleHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
