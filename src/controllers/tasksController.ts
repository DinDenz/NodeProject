import { DOESNT_EXISTS } from "../constants.ts";
import { tasks } from "../data.ts";
import type { Request, Response } from "express";

export const getAllTasks = (req: Request, res: Response) => {
  console.log(req.query);
  console.log(req.body);

  const isSorted = req.query.sorted;

  if (isSorted) {
    const sortedTasks = tasks.sort((a, b) => a.title.localeCompare(b.title));
    res.json({ data: sortedTasks });
  } else {
    res.json({ data: tasks });
  }
};

export const getTaskById = (req: Request, res: Response) => {
  const taskId = req.params.id;

  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    res.json({ data: task });
  } else {
    res.status(404).json({ error: "Nothing found" });
  }
};

export const createTask = (req: Request, res: Response) => {
  const title = req.body.title;

  const newTask = { id: (tasks.length + 1).toString(), title };

  tasks.push(newTask);

  res.json({ data: newTask });
};

export const updateTask = (req: Request, res: Response) => {
  const taskId = req.params.id;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  const isTaskExists = taskIndex !== DOESNT_EXISTS;

  if (isTaskExists) {
    tasks[taskIndex].title = req.body.title;
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: "Nothing found. Can't update" });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  const isTaskExists = taskIndex !== DOESNT_EXISTS;
  if (isTaskExists) {
    tasks.splice(taskIndex, 1);
    res.json({ data: { id: taskId } });
  } else {
    res.status(404).json({ error: "Nothing found. Can't delete" });
  }
};
