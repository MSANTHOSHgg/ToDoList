import React, { useState, useEffect } from "react";
import TaskForm from "./Components/TaskForm/TaskForm";
import TaskList from "./Components/TaskList/TaskList";
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const addTask = async (task) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/tasks", task);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error saving task:", error);
      throw error;
    }finally {
      setLoading(false);
    }
  };


  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3001/taskdelete/${id}`);
      toast.success("Task deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setTasks(tasks.filter((task) => task.task_id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Please try again.", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }finally {
      setLoading(false);
    }
  };
  

  const markComplete = async (id) => {
    const taskToUpdate = tasks.find((task) => task.task_id === id);
    
    if (!taskToUpdate) {
      toast.error("Task not found.");
      return;
    }
    
    try {
      setLoading(true); 
      
      const response = await axios.put(`http://localhost:3001/taskupdate/${id}`, {
        completed: !taskToUpdate.completed,
      });
      
      toast.success("Task updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
  
      setTasks(
        tasks.map((task) =>
          task.task_id === id ? { ...task, completed: response.data.completed } : task
        )
      );
      
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Please try again.", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false); 
    }
  };
  

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/taskslist");
      if (response.data && response.data.tasks) {
        setTasks(response.data.tasks);
      } else {
        toast.error('No tasks found.');
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


    return (
      <div className="container">
        <h1>To-Do List</h1>
        <TaskForm addTask={addTask} setTasks={setTasks} tasks={tasks} />
        {loading ? (
        <div className="clipLoader">
          <ClipLoader size={50} color="#0000ff" loading={loading} />
        </div>
      ) : (
        <TaskList tasks={tasks} deleteTask={deleteTask} markComplete={markComplete} />
      )}
      <ToastContainer />
      </div>
    );
  };

  export default App;
