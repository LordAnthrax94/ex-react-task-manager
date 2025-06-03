import axios from "axios";
import { createContext, useContext, useState, useEffect, use } from "react";

const GlobalContext = createContext();
const GlobalProvider = ({children}) =>{

const api_url = import.meta.env.VITE_API_URL;

const [tasks, setTasks] = useState([]);

const fetchTasks = () =>{
  axios
  .get(`${api_url}/tasks`)
  .then((res) =>{setTasks(res.data)})
  .catch((error) => console.error("Error fetching tasks:", error));    
};

useEffect(() => {
  fetchTasks();}, []);

  const value = {
      tasks,
      setTasks,
      fetchTasks,
    };

   console.log(tasks);
   
    

  return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

const useGlobalContext = () => useContext(GlobalContext)

export { useGlobalContext, GlobalProvider }

