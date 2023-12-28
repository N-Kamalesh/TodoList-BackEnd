import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/todos", async (req, res) => {
  try {
    const tasks = await prisma.list.findMany();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.post("/todos/add", async (req, res) => {
  const task = req.body.task;
  try {
    const { data } = await prisma.list.create({
      data: {
        task,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.patch("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const newTask = req.body.task;
  try {
    const { data } = await prisma.list.update({
      where: {
        id,
      },
      data: {
        task: newTask,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error.meta.cause);
    res.json(error.meta.cause);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { data } = await prisma.list.delete({
      where: {
        id,
      },
    });
    res.json(data);
  } catch (error) {
    console.log(error.meta.cause);
    res.json(error.meta.cause);
  }
});

app.listen(port, (req, res) => console.log(`Server listening on port ${port}`));
