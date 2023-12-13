import Button from "@mui/material/Button/Button"
import { useActions } from "common/hooks/useActions";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/tasks/todolists/todolists.reducer";
import React, { useCallback } from "react"

type Props = {
    todolist: TodolistDomainType;
    
  };

 export const FilterTasksButton=({todolist}:Props)=>{
    const { changeTodolistFilter } = useActions(todolistsActions);

    const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
        changeTodolistFilter({ id, filter });
      }, []);
    const onAllClickHandler = () => changeFilter("all", todolist.id)
       
      const onActiveClickHandler = () => changeFilter("active", todolist.id)
       
      const onCompletedClickHandler = () => changeFilter("completed", todolist.id)
        
    return(
       
      <div>
        <Button
          variant={todolist.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
        
    )
}
