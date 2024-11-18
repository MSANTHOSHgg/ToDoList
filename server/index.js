const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const todoList = require("./model/todolist");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/TodoList")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.get("/taskslist", async (req, res) => {
  try {
    const tasks = await todoList.find();
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  const newTask = {
    task_id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    completed: false,
  };
  try {
    const todo = await todoList.create(newTask);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

app.put("/taskupdate/:id", async (req, res) => {
  const {id}=req.params;
  const { completed } =req.body;
    try {
      const updatedTask = await todoList.findOneAndUpdate(
        { task_id: id },  
        { $set: { completed } },
        { new: true }  
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(400).json({ error: "Failed to update task" });
    }
});

app.delete("/taskdelete/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const deletedTask = await todoList.findOneAndDelete({ task_id: id });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ error: "Failed to delete task" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
