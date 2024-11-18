import React from "react";

const TaskItem = ({ task, deleteTask, markComplete }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem",
        textDecoration: task.completed ? "line-through" : "none",
      }}
    >
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