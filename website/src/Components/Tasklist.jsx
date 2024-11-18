import React from "react";
import TaskItem from "./Taskitem";

const TaskList = ({ tasks, deleteTask, markComplete }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available. Add a new one!</p>
      ) : (
        <ul>
          {tasks.map((task,index) => (
            <li key={task.id||index}>
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
