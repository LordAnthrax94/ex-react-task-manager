import { useContext, useState, useMemo, useCallback } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

function debounce(callback, delay){
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  }  
}

export default function TaskList() {

  const { tasks } = useContext(GlobalContext);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const debaunceSearch = useCallback(
    debounce(setSearchQuery, 500), []);

  const sortIcon = sortOrder === 1 ? "↑" : "↓";

  const handleSort = (field) =>{
    if(sortBy === field){
      setSortOrder(prev => prev * -1)
    }else{
      setSortBy(field);
      setSortOrder(1);
    }
  }

  const filteredSortedTask = useMemo(() => {
    return [...tasks]
    .filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>{
      let comparison; 

      if(sortBy === "title"){
        comparison = a.title.localeCompare(b.title);
      }else if(sortBy === "status"){
       const statusOption = ["To do", "Doing", "Done"];
       comparison = statusOption.indexOf(a.status) - statusOption.indexOf(b.status);
      }else if(sortBy === "createdAt"){
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        comparison = dateA - dateB;
      }

      return comparison * sortOrder;
    })    
  }, [tasks, sortBy, sortOrder, searchQuery]); 

  console.log(tasks);
  

  return (
    <div className="taskPage">
      <h1>Task List</h1>
        <input type="text"
        placeholder="Cerca per nome"        
        onChange={(e) => debaunceSearch(e.target.value)}
        className="searchInput"
        />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Nome {sortBy === "title" && sortIcon} 
            </th>
            <th onClick={() => handleSort("status")}>
              Status {sortBy === "status" && sortIcon}
            </th>
            <th onClick={() => handleSort("createdAt")}>
              Data Creazione {sortBy === "createdAt" && sortIcon}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredSortedTask.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>     
    </div>
  );
}