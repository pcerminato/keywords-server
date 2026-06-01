export interface IDateFactory<T> {
  newDateNow: () => T;
  isValidDateFormat: (date: T) => boolean | Error;
}
