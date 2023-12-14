import Button from "@mui/material/Button/Button"
import { useActions } from "common/hooks/useActions";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/tasks/todolists/todolists.reducer";
import React, { useCallback } from "react"

type Props = {
    todolist: TodolistDomainType;
    
  };

 export const FilterTasksButton=({todolist}:Props)=>{
    const { changeTodolistFilter } = useActions(todolistsActions);

    
    
      const filterTasksHandler=(filter: FilterValuesType)=>{
        changeTodolistFilter({id:todolist.id,filter});
      }
        
    return(
       
      <div>
        <Button
          variant={todolist.filter === "all" ? "outlined" : "text"}
          onClick={()=>filterTasksHandler('all')}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={todolist.filter === "active" ? "outlined" : "text"}
          onClick={()=>filterTasksHandler('active')}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={todolist.filter === "completed" ? "outlined" : "text"}
          onClick={()=>filterTasksHandler('completed')}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
        
    )
}
