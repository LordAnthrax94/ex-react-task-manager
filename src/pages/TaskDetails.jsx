import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";


export default function TaskDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask } = useContext(GlobalContext);

  const task = tasks.find(task => task.id === parseInt(id));

  const [showModal, setShowModal] = useState(false);

  if (!task) {
    return <h2>Task not found</h2>;
  }

  const handleDelete = async () => {
    try{
      await removeTask(task.id);
      alert("Task eliminata con successo");
      navigate("/Task");  
    }
    catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="container">
      <div className="taskDettaglio">
        <h1>Dettaglio pagina</h1>
          <p><strong>Nome Task:</strong>{task.title}</p>
          <p><strong>Descrizione:</strong> {task.description}</p>
          <p><strong>Status:</strong>{task.status}</p>
          <p><strong>Creazione:</strong>: {new Date(task.createdAt).toLocaleDateString()}</p> 
          <button className="delButton" onClick={() => setShowModal(true)}>Elimina task</button>
          <Modal 
            title="Conferma Eliminazione"
            content={`Sei sicuro di voler eliminare il task "${task.title}"?`}
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
            confirmText="Elimina"/>       
      </div>
    </div>
    
  )
}