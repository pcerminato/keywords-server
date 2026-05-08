import { NextFunction, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

import config from "../config/index.js";
import { makePartitionList } from "../utils/makePartitionList.js";

export async function callAI(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body) {
      throw new Error(
        "Missing lists in the request body. Received content type: " +
          req.headers["content-type"],
      );
    }

    const client = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY || "" });

    const prompt = `At the botton there is a json with two lists of words,
                One list has positive/accepted words and the other negative/denied words.
                Extend each list considering the following requirements:
                - for each word in the list add 2 to 4 words to the list that would enrich the context of meaning.
                - Also add 2 to 4 words that would amplify or extend the meaning of the existing words, like for example with synonyms.
                - Keep the original words from the input lists into the new output.
                The purpose is to have more comprehensive and wider meaning scope from the words contained on each list.
                The resulting list should contain the same format as the input and the new words should be added to the list as
                individual words.
                The output should be a valid json, clean of extra chars and ready to work with JSON.parse().
                Don't add \`\`\`json or line break symbols.
                Input:
                ${JSON.stringify(req.body)}`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const result = JSON.parse(response?.text || "{}");

    // harcoded result to save calls to gemini when developing :)
    /* const result = JSON.parse(
      '{"lists":{"accepted":["health","wellbeing","wellness","vitality","nutrition","nourishment","diet","balanced diet","eating habits","meditation","mindfulness","calmness","inner peace","relaxation"],"denied":["diabetes","high blood sugar","glucose levels","blood glucose","obesity","overweight","excess weight","weight gain","stress","anxiety","tension","pressure"]}}',
    ); */

    res.json(
      {
        results: [makePartitionList(req.body.lists, result.lists)],
        count: 1,
      },
    );
  } catch (error) {
    next(error);
  }
}
