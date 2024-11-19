import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import './TaskList.css'
const TaskList = ({ tasks, deleteTask, markComplete }) => {
  return (
    <div aria-live="polite">
  {tasks.length === 0 ? (
    <p className="no-tasks-message">No tasks available. Add a new one!</p>
  ) : (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            deleteTask={deleteTask}
            markComplete={markComplete}
          />
        </li>
      ))}
    </ul>
  )}
</div>
  );
};

export default TaskList;
