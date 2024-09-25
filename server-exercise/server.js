const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const PORT = 8082;

// Enable CORS for all routes
app.use(cors());

// Using OpenAI GPT-4 Turbo
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/workoutStream", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    height,
    weight,
    bodyType,
    fitness,
    gender,
    goal,
  } = req.query;

  console.log(req.query);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (chunk) => {
    let chunkResponse;
    console.log(chunk.choices[0].message.content);
    chunkResponse = {
      action: "chunk",
      chunk: chunk.choices[0].message.content || "",
    };

    res.write(`data: ${JSON.stringify(chunkResponse)}\n\n`);
  };

  const prompt = [];

  prompt.push(
    "Please generate a detailed workout plan tailored for an individual based on the provided personal details. The output should be formatted as follows:"
  );
  prompt.push(
    "1. Names: List the names of 10 suitable gym exercises for the individual. Format these names with each exercise on a new line, starting with the exercise title followed by a newline character. Exactly like `Names: Barbell Curls\nDeadlift\nSquats\n`"
  );
  prompt.push(
    "2. Reps: Under the title 'Reps' which should be written exactly like `Reps:`, provide a detailed description of the number of repetitions for each of the listed exercises. Ensure each exercise's repetitions are listed clearly, one per line."
  );
  prompt.push(
    "3. Detail Plan: Under the title 'Detail Plan' which should be written exactly like `Detail Plan:`, describe a complete weekly workout schedule. Specify which exercises should be performed on each day of the week to effectively achieve the individual's fitness goals."
  );
  prompt.push("The input details for the individual are as follows:");
  prompt.push(`[Age (in years): ${age}]`);
  prompt.push(`[Height (in inches): ${height}]`);
  prompt.push(`[Weight (in kilograms): ${weight}]`);
  prompt.push(`[Body Type: ${bodyType}]`);
  prompt.push(`[Current Fitness Level: ${fitness}]`);
  prompt.push(`[Gender: ${gender}]`);
  prompt.push(`[Final Goal of the Workout Plan: ${goal}]`);

  const messages = [
    {
      role: "system",
      content: prompt.join(" "),
    },
  ];

  getModelResponse(messages, sendEvent);

  req.on("close", () => {
    res.end();
  });
});

async function getModelResponse(query, callback) {
  console.log("in get model");

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: query,
      // stream: true,
    });

    console.log(completion.choices[0]);

    callback(completion);
  } catch (error) {
    console.error("Error fetching data from ChatGpt API: ", error);
    throw new Error("Error fetching data from ChatGpt API");
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
