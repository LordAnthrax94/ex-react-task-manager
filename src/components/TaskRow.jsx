import { memo } from "react";

const taskRow = memo(({task}) =>{

  const statusColors = task.status.replace(" ", "").toLowerCase();

  return (
    <tr>
      <td>{task.title}</td>
      <td className={statusColors}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  )
});

export default taskRow;