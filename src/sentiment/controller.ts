import { NextFunction, Request, Response } from "express";
import { find, findOne, insertOne } from "../db/crud/index.js";

export const findLists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const results = await find();

    res.status(201).json({
      results: results,
      count: results?.length,
    });
  } catch (error) {
    res.status(500).json({
      results: [],
      count: 0,
      message: "Error processing the query",
    });
    next(error);
  }
};

export const findOneList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const results = await findOne(id as string);

    res.status(201).json({
      results: [results],
      count: 1,
    });
  } catch (error) {
    res.status(500).json({
      results: [],
      count: 0,
      message: "Error processing the query",
    });
    next(error);
  }
};

export const insertOneList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sentiment = req.body;

    if (!sentiment) {
      return res.status(500).json({ message: "Request body is not defined" });
    }

    const result = await insertOne(sentiment);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Could not insert the record" });
    next(error);
  }
};
