import { IDateFactory } from "../interfaces/IDateFactory.js";
import { keywordsRecordFactory } from "./KeywordsRecord.js";

describe("KeywordsRecord", () => {
  const mockDateFactory = (): IDateFactory<string> => ({
    isValidDateFormat: (date: string) => date === new Date(date).toDateString(),
    newDateNow: () => new Date(Date.now()).toDateString(),
  });
  const createKeywordsRecord = keywordsRecordFactory(mockDateFactory());

  test.each([[
    "name",
    createKeywordsRecord("", {}),
    "A name must be set for a keywords record",
  ], [
    "lists",
    createKeywordsRecord("Test name", {}),
    "At least one keywords list must be set",
  ], [
    "createdAt",
    createKeywordsRecord(
      "Test name",
      { "accepted": ["hello", "world"] },
      "dd/mm/YYYY", // bad date format
    ),
    "The date format is not valid",
  ]])("Should throw error if the '%s' attribute not valid", (s, k, e) => {
    expect(() => k.validate()).toThrow(e);
  });

  test("Should have valie attributes and default dates set", () => {
    const name = "Test name";
    const lists = { "accepted": ["hello", "world"] };
    const k = createKeywordsRecord(
      "Test name",
      lists,
      new Date(Date.now()).toDateString(),
    );

    expect(() => k.validate()).not.toThrow();
    expect(k.name).toEqual(name);
    expect(k.lists).toStrictEqual(lists);
  });
});
