import express from "express";
import cors from "cors";
import { todoSchema } from "./types";
import { prisma } from "./db";

const app = express();

app.use(express.json());
app.use(cors())

app.post("/todo", async (req, res) => {
  const parsed = todoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error });
  }
  const data = parsed.data;

  const todo = await prisma.todo.create({
    data: {
      title: data.title,
      description: data.description,
    }
  });

  res.status(200).json({ message: "Todo created successfully",
    todo
   });
});

app.get("/todos",async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.status(200).json({ todos });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});