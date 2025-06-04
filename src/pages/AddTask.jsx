import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import useTask from "../hooks/useTask";

const symbols = "!@#$%^&*()£-_=+[]{}|;:'\\\",.<>?/`~";

export default function addTask() {

  const { addTask } = useContext(GlobalContext);

  const [taskTitle, SetTaskTitle] = useState("");
  const descriptionRef = useRef()
  const statusRef = useRef()

  const validateTaskTitle = useMemo (() => {
    if(!taskTitle.trim()) 
      return "Il titolo della task non può essere vuoto.";    
    if([...taskTitle].some(char => symbols.includes(char)))
      return "Il titolo della task non può contenere caratteri speciali.";
    if(taskTitle.length < 3 || taskTitle.length > 50)
      return "Il titolo della task deve essere compreso tra 3 e 50 caratteri.";
    return "";  
  }, [taskTitle]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (validateTaskTitle) return;

    const newTask = {
      title: taskTitle.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value
    };

    try{
      await addTask(newTask);
      alert("Task aggiunta con successo!");
      SetTaskTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
    }catch(error){
      alert(error.message);
    }
    
  } 

  return (
    <div className="add-task-container">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <label>
          Nome della Task:
          <input
            className="input-task" 
            type="text"
            placeholder="Inserire nome task"
            value={taskTitle} 
            onChange={(e) => SetTaskTitle(e.target.value)}            
          />
        </label>
        {validateTaskTitle && <p className="error-message">{validateTaskTitle}</p>}
        <label>
          Descrizione:
          <textarea 
            className="input-task"
            ref={descriptionRef}
            placeholder="Inserire descrizione task"            
          />          
        </label>
        <label>
          Stato:
          <select className="input-task" ref={statusRef} defaultValue="To do">            
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="DOne">Done</option>
          </select>
        </label>
        <button className="button-task-add" type="submit" disabled={validateTaskTitle}>Aggiungi Task</button>
      </form>      
    </div>
  );
}