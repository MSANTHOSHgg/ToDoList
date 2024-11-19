import React from "react";
import './TaskItem.css'
const TaskItem = ({ task, deleteTask, markComplete }) => {
  return (
    <div className="TaskItem" style={{textDecoration: task.completed ? "line-through" : "none",color: '#888',backgroundColor:task.completed ?'#d3f6bf':''}}>
      <div>
        <strong>{task.name}</strong>: {task.description}
      </div>
      <div>
        <button onClick={() => markComplete(task.task_id)} style={{ marginRight: "0.5rem" }}>
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => deleteTask(task.task_id)}>Delete</button>
        
      </div>
    </div>
  );
};

export default TaskItem;