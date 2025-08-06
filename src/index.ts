import express from "express";
import tasksRouter from "./router/tasks.ts";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* app.use("/", tasksRouter); router from the root*/

app.use("/tasks", tasksRouter); //Router begins from tasks. Removed tasks from endpoints

app.get("/", (req, res) => {
  /*   res.send("Hello world"); */
  res.json({ message: "Hello world" });
});

app.use((req, res) => res.status(404).json({ error: "not found" }));

app.listen(PORT, () => {
  console.log(`Server is running in localhost:${PORT}`);
});
