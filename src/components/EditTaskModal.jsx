import { useState, useRef } from 'react';
import Modal from './Modal';

export default function EditTaskModal({ show,task, onClose, onSave }) {

  const [editedTask, setEditedTask] = useState(task);
  const formRef = useRef()
  const changeEditedTask = (key, event) => {
    setEditedTask(prev => ({
      ...prev,
      [key]: event.target.value
    }));
  }

  const  handleSubmit= e => {
    e.preventDefault();
    onSave(editedTask);    
  }

  const {title, description, status} = editedTask;

  return (
  <Modal 
    title="Modifica Task"
    content={
      <form ref={formRef} onSubmit={handleSubmit} className="editTaskForm">
        <label className="labelTask">
          Nome Task: 
          <input className="taskTitleInput"
          type="text"
          value={title}
          onChange={e => changeEditedTask("title", e)}
          />
        </label>
        <label className="labelTask">
          Descrizione Task: 
          <textarea className="taskDescriptionInput"
          value={description}
          onChange={e => changeEditedTask("description", e)}
          />
        </label>
        <label className="labelTask">
          Status Task
          <select className="taskStatusSelect" 
            value={status}
            onChange={e => changeEditedTask("status", e)}
          >
            <option value="To Do">To Do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>             
        </label>
        
      </form>
    }
    onConfirmText="Salva"
    show={show}
    onClose={onClose}
    onConfirm={() => formRef.current.requestSubmit()}
  />
)
}