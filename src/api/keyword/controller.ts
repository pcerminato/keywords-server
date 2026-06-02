import { NextFunction, Request, Response } from "express";
import {
  type KeywordsRecord,
  keywordsRecordFactory,
} from "../../entities/index.js";
import { find, findOne } from "../../infrastructure/db/crud/index.js";
import { createIsoDate } from "../../application/services/IsoDate.js";

import { createSaveKeywordsRecord } from "../../use-cases/index.js";
import { MongoDb } from "../../infrastructure/db/index.js";

/* TODO these should be injected. The way the are now are global state */
const createRecordFactory = keywordsRecordFactory(createIsoDate());
const database = new MongoDb();

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
    const result = await findOne(id as string);
    const results = result ? [result] : [];

    res.status(200).json({
      results: results,
      count: results.length,
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
    const body: KeywordsRecord = req.body;
    /* Dependencies injection */
    const saveKeywordsRecord = createSaveKeywordsRecord(
      database,
      createRecordFactory,
    );
    const result = await saveKeywordsRecord(
      body?.name,
      body?.lists,
    );

    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof RangeError || error instanceof TypeError) {
      return res.status(422).json({
        message: error?.message || "Unprocessable entity",
      });
    }
    res.status(500).json({ message: "Could not insert the record" });
    next(error);
  }
};
