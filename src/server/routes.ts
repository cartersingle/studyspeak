import express from "express";
import { getExpressSession } from "../lib/auth";
import db from "../lib/db";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import axios from "axios";
import * as z from "zod";

const router = express.Router();

const responseSchema = z
  .object({
    term: z.string(),
    definition: z.string(),
  })
  .array();

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

    try {
      fs.unlinkSync(path.join(__dirname, `${recording.id}.webm`));
    } catch {}

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        {
          role: "user",
          content: `Based on the following text block generate a list of flashcards 
            that can be studied in with each flashcard being an object with a term and defintion key, if there is no possible
            flashcards return an empty list. ${transcription.text}
            `,
        },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });

    const flashcardsObject = JSON.parse(
      completion.choices[0].message.content || "[]"
    );

    const flashcards = responseSchema.parse(flashcardsObject.flashcards);

    await db.recording.update({
      where: {
        id: recording.id,
      },
      data: {
        status: "COMPLETE",
        recordingText: transcription.text,
      },
    });

    await db.flashCard.createMany({
      data: flashcards.map((flashcard) => ({
        ...flashcard,
        recordingId: recording.id,
        userId,
      })),
    });

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export { router };
