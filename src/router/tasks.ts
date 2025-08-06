import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/tasksController.ts";

const router = express.Router();

router.get("/", getAllTasks);

router.get("/:id/comments/:comment", (req, res) => {
  console.log(req.params, "request params");
  res.json({ data: "lOl" });
});

router.get("/:id", getTaskById);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

/* router.all("/")  */ //all is usefull for each request regardless its route

export default router;
