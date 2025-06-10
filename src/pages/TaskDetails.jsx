import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";


export default function TaskDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);

  const task = tasks.find(task => task.id === parseInt(id));

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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

  const handleUpdate = async modifyTask => {
    try {
      await updateTask(modifyTask);      
      setShowDeleteModal(false);      
      alert("Task modificata con successo");
      navigate("/Task");
    } catch (error) {
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
          <button className="delButton" onClick={() => setShowDeleteModal(true)}>Elimina task</button>
          <button className="editButton" onClick={() => setShowUpdateModal(true)}>Modifica task</button>

          <Modal 
            title="Conferma Eliminazione"
            content={`Sei sicuro di voler eliminare il task "${task.title}"?`}
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            confirmText="Elimina"/> 

          <EditTaskModal
            task={task}
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            onSave={handleUpdate}
          />      
      </div>
    </div>
    
  )
}