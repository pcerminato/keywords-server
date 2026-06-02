/* This file holds the database models */
import { KeywordsLists, KeywordsRecord } from "../../entities/index.js";

export type KeywordsListsModel = KeywordsLists;

export interface KeywordRecordModel {
  _id?: string;
  name: KeywordsRecord["name"];
  createdAt: KeywordsRecord["createdAt"];
  lastUpdateAt: KeywordsRecord["lastUpdateAt"];
  lists: KeywordsRecord["lists"];
}

/* Transforms a cre business keyword entity to a database keyword model */
export function transformModel(keyword: KeywordsRecord): KeywordRecordModel {
  return {
    name: keyword.name,
    lists: keyword.lists,
    createdAt: keyword.createdAt as string,
    lastUpdateAt: keyword.lastUpdateAt as string,
  };
}
