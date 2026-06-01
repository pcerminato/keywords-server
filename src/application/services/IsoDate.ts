import { IDateFactory } from "../../interfaces/IDateFactory.js";

export function createIsoDate(): IDateFactory<string> {
  return Object.freeze({
    newDateNow() {
      return new Date(Date.now()).toISOString();
    },
    isValidDateFormat(isoDate: string) {
      try {
        return new Date(isoDate).toISOString() === isoDate;
      } catch {
        return false;
      }
    },
  });
}
