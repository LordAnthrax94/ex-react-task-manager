import { memo } from "react";
import { Link } from "react-router-dom";

const taskRow = memo(({task}) =>{

  const statusColors = task.status.replace(" ", "").toLowerCase();

  return (
    <tr>
      <td >
        <Link to={`/task/${task.id}`} className="taskTitleLink">{task.title}</Link>
      </td>
      <td className={statusColors}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  )
});

export default taskRow;