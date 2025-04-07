import { isListOfString } from "@/utils/type_helpers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ApiException extends Error {
  statusCode?: number;
  errors?: any;
  code?: string;

  constructor(statusCode?: number, errors?: any, code?: string) {
    super("");
    this.statusCode = statusCode;
    this.errors = errors;
    this.code = code;
  }
}

export class ApiParseErrorException extends Error {}

export class AccessTokenExpiredException extends Error {}

export function getExceptionMessages(error: unknown): string[] {
  /** Always return non-zero list of string */
  if (error instanceof ApiException) {
    try {
      const messages: string[] = isListOfString(error.errors) && error.errors;
      if (messages.length > 0) {
        return messages;
      } else {
        throw new Error("Something went wrong");
      }
    } catch {
      return ["Something went wrong"];
    }
  } else {
    return ["Something went wrong"];
  }
}
