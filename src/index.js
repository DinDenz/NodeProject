import express from "express";
import { tasks } from "./data.js";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  /*   res.send("Hello world"); */
  res.json({ message: "Hello world" });
});

app.get("/tasks", (req, res) => {
  res.json({ data: tasks });
});

app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    res.json({ data: task });
  } else {
    res.status(404).json({ error: "Nothing found" });
  }
});

/* ========================================= */

const DOESNT_EXISTS = -1;

app.post("/tasks", (req, res) => {
  const title = req.body.title;

  const newTask = { id: (tasks.length + 1).toString(), title };

  tasks.push(newTask);

  res.json({ data: newTask });
});

app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  const isTaskExists = taskIndex !== DOESNT_EXISTS;

  if (isTaskExists) {
    tasks[taskIndex].title = req.body.title;
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Nothing found. Can't update" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  const isTaskExists = taskIndex !== DOESNT_EXISTS;
  if (isTaskExists) {
    tasks.splice(taskIndex, 1);
    res.json({ data: { id: taskId } });
  } else {
    res.status(404).json({ error: "Nothing found. Can't delete" });
  }
});

app.use((req, res) => res.status(404).json({ error: "not found" }));

app.listen(PORT, () => {
  console.log(`Server is running in localhost:${PORT}`);
});
