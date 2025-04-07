/* eslint-disable @typescript-eslint/no-explicit-any */
type IsFunction<T> = T extends (...args: any[]) => any ? T : never;

export const isFunction = <T>(value: T): value is IsFunction<T> =>
  typeof value === "function";

export function isListOfString(value: any) {
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return true;
  } else {
    return false;
  }
}
