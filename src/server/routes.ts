import express from "express";
import OpenAI from "openai";
// import fetch from "node-fetch";
import axios from "axios";
import fs from "fs";

import db from "../lib/db";
import path from "path";

const router = express.Router();

router.post("/recording", express.json(), async (req, res) => {
  if (!req.body.recordingId) return res.sendStatus(400);

  try {
    const recording = await db.recording.findUnique({
      where: {
        id: req.body.recordingId,
      },
    });

    if (!recording) return res.sendStatus(404);

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

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export { router };
