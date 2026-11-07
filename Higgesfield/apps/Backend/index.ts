import express from "express";
import { prisma } from "./db";
import { createAvatarSchema, createUserSchema } from "./types";

const app = express();

app.get("/", (req, res) => {});

app.post("/api/v1/signup", async (req, res) => {
  const { success, data } = createUserSchema.safeParse(req.body);
  if (!success) {
    res.status(403).json({
      message: "Invalid Credentials",
    });
    return;
  }
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password,
    },
  });
  res.json({
    id: user.id,
  });
});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/avatar", (req, res) => {
    const { success, data } = createAvatarSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Invalid Avatar Data"
        });
        return;
    }

    res.json({
    })
});

app.post("/api/v1/video", (req, res) => {});

app.get("/api/v1/video/:videoId", (req, res) => {});

app.get("/api/v1/videos", (req, res) => {});

app.get("/api/v1/me", (req, res) => {});

app.get("/api/v1/models", (req, res) => {});

app.get("/api/v1/avatar/:avatarId", (req, res) => {});

app.get("/api/v1/avatars", (req, res) => {});
