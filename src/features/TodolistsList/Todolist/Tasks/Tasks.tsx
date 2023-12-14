import { TaskStatuses } from "common/enums/common.enums";
import { Task } from "features/TodolistsList/Todolist/Task/Task";
import { TaskType } from "features/TodolistsList/api/todolists.api";
import { TodolistDomainType } from "features/TodolistsList/model/tasks/todolists/todolists.reducer";
import React from "react";

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
  };
  
export const Tasks =({tasks,todolist}:Props)=>{
    let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return(
    <div>
        {tasksForTodolist.map((t) => (
          <Task key={t.id} task={t} todolistId={todolist.id} />
        ))}
        
      </div>
  )
    
}
