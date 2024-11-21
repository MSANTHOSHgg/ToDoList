import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import './TaskList.css';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskList = ({ tasks, setTasks, deleteTask, markComplete }) => {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  return (
    <div aria-live="polite">
      {tasks.length === 0 ? (
        <p className="no-tasks-message">No tasks available. Add a new one!</p>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <ul
                className="task-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id || index}
                    draggableId={(task.id || index).toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          task={task}
                          deleteTask={deleteTask}
                          markComplete={markComplete}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default TaskList;
