import { useState, useEffect } from "react";

export default function useTask(){

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

    const addTask =  async newTask => {
      const response = await fetch(`${api_url}/tasks`, {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(newTask)
      });
      const { success, message, task } = await response.json()
      if(!success)throw new Error(message);
      setTasks(prev => [...prev, task]);
    }

    const updateTask = () => {
      ;      
    }

    const removeTask = () => {
      
    }

    return {tasks, addTask, updateTask, removeTask}
};