import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetails() {

  const { id } = useParams();

  const { tasks } = useContext(GlobalContext);

  const task = tasks.find(task => task.id === parseInt(id));

  if (!task) {
    return <h2>Task not found</h2>;
  }

  function handleDelete() {
    console.log("TASK ELIMINATA", task.id);
    
  }

  return (
    <div className="container">
      <div className="taskDettaglio">
        <h1>Dettaglio pagina</h1>
          <p><strong>Nome Task:</strong>{task.title}</p>
          <p><strong>Descrizione:</strong> {task.description}</p>
          <p><strong>Status:</strong>{task.status}</p>
          <p><strong>Creazione:</strong>: {new Date(task.createdAt).toLocaleDateString()}</p> 
          <button className="delButton" onClick={handleDelete}>Elimina task</button>       
      </div>
    </div>
    
  )
}