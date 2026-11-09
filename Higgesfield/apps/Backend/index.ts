import express from "express";
import { prisma } from "./db";
import { createAvatarSchema, createUserSchema } from "./types";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import axios from "axios";
import path from "path";

const app = express();

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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

app.post("/api/v1/avatar", async (req, res) => {
  console.log(req.body);
  const { success, data } = createAvatarSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Invalid Avatar Data",
    });
    return;
  }

  let base64Image = await axios
    .get(data.imageUrl, {
      responseType: "arraybuffer",
    })
    .then((resp) => Buffer.from(resp.data, "binary").toString("base64"));

  let prompt = `Create a string variable containing instructions to generate front, left profile, and right
  profile views of a fantasy character based on the input name, ensuring visual consistency
  with the reference image.`;

  const response = await ai.interactions.create({
    model: "gemini-3.1-flash-image",
    input: [
      { type: "text", text: prompt },
      {
        type: "image",
        mime_type: "image/png",
        data: base64Image,
      },
    ],
  });

  console.log(response);

  const generatedImage = response.output_image;

  if (generatedImage) {
    if (generatedImage && generatedImage.data) {
      const imageBuffer = Buffer.from(generatedImage.data, "base64");
      const assetsPath = path.join(__dirname, "assets");
      fs.mkdirSync(assetsPath, { recursive: true });
      fs.writeFileSync(path.join(assetsPath, `${data.name}.png`), imageBuffer);
    }
    console.log("Image saved as gemini-native-image.png");
  }

  res.json({});
});

app.post("/api/v1/video", (req, res) => {});

app.get("/api/v1/video/:videoId", (req, res) => {});

app.get("/api/v1/videos", (req, res) => {});

app.get("/api/v1/me", (req, res) => {});

app.get("/api/v1/models", (req, res) => {});

app.get("/api/v1/avatar/:avatarId", (req, res) => {});

app.get("/api/v1/avatars", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
