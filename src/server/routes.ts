import express from "express";
import { getExpressSession } from "../lib/auth";
import db from "../lib/db";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import axios from "axios";

const router = express.Router();

router.post("/recording", express.json(), async (req, res) => {
  const { isLoggedIn, userId } = await getExpressSession(
    req,
    res,
    process.env.SESSION_PASSWORD as string
  );

  if (!isLoggedIn) return res.redirect("/");

  if (!req.body.recordingId) return res.sendStatus(400);

  const recording = await db.recording.findUnique({
    where: {
      id: req.body.recordingId,
    },
  });

  if (!recording) return res.sendStatus(404);

  try {
    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

    const download = fs.createWriteStream(
      path.join(__dirname, `${recording.id}.webm`)
    );
    const response = await axios.get(recording.recordingUrl, {
      responseType: "stream",
    });

    await new Promise((resolve) => {
      response.data.pipe(download);
      download.on("close", resolve);
    });

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(path.join(__dirname, `${recording.id}.webm`)),
      model: "whisper-1",
    });

    fs.unlinkSync(path.join(__dirname, `${recording.id}.webm`));

    console.log(transcription);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  res.sendStatus(201);
});

export { router };
