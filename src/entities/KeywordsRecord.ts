import { IDateFactory } from "../interfaces/IDateFactory.js";

export type KeywordsLists = { [key: string]: string[] };

export type KeywordsRecord = ReturnType<
  ReturnType<typeof keywordsRecordFactory>
>;

export function keywordsRecordFactory<T>(dateFactory: IDateFactory<T>) {
  return function _createKeywordsRecord(
    name = "",
    lists: KeywordsLists,
    createdAt?: T,
  ) {
    const dateNow = dateFactory.newDateNow();
    const lastUpdateAt = dateNow;

    createdAt = createdAt || dateNow;

    function validate() {
      if (!name || name.length === 0) {
        throw new RangeError("A name must be set for a keywords record");
      }
      if (!lists || Object.keys(lists).length === 0) {
        throw RangeError("At least one keywords list must be set");
      }
      if (
        createdAt &&
          !dateFactory.isValidDateFormat(createdAt) ||
        !dateFactory.isValidDateFormat(lastUpdateAt)
      ) {
        throw TypeError("The date format is not valid");
      }
    }

    return Object.freeze({
      name,
      lists,
      createdAt,
      lastUpdateAt,
      validate,
    });
  };
}
