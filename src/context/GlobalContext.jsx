import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();
export function GlobalProvider ({children}){

const api_url = import.meta.env.VITE_API_URL;

const [tasks, setTasks] = useState([]);

const fetchTasks = () =>{
  fetch(`${api_url}/tasks`)
  .then(res => res.json())
  .then(data => setTasks(data))
  .catch((error) => console.error("Error fetching tasks:", error));    
};

useEffect(() => {
  fetchTasks();}, []);

  const value = {
      tasks,
      setTasks,
      fetchTasks,
    }; 
   
  return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}




