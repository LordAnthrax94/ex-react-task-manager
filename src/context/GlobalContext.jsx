import { createContext } from "react";
import useTask from "../hooks/useTask";

export const GlobalContext = createContext();

export function GlobalProvider ({children}){

const {tasks, addTask, updateTask, removeTask} = useTask();

  const value = {
      tasks,     
      addTask, 
      updateTask, 
      removeTask
    }; 
   
  return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}




