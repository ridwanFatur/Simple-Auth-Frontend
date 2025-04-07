import {
  AccessTokenExpiredException,
  ApiException,
  ApiParseErrorException,
} from "./exceptions";

export async function handleResponse<T>(response: Response) {
  let jsonResponse = {};
  try {
    jsonResponse = await response.json();
  } catch {
    jsonResponse = {};
  }

  if (!response.ok) {
    /** Invalid or expired token */
    if (response.status == 401) {
      let isTokenExpired = false;
      try {
        const errorCode = "code" in jsonResponse && jsonResponse["code"];
        if (errorCode != "token_not_valid") {
          throw new Error("Something went wrong");
        }

        isTokenExpired = true;
      } catch {
        isTokenExpired = false;
      }

      if (isTokenExpired) {
        throw new AccessTokenExpiredException();
      } else {
        /** Clear and reload browser */
        localStorage.clear();
        window.location.reload();
      }
    }

    /** Throw Exception */
    throw new ApiException(
      response.status,
      "errors" in jsonResponse ? jsonResponse["errors"] : undefined,
      "code" in jsonResponse && typeof jsonResponse["code"] === "string"
        ? jsonResponse["code"]
        : undefined
    );
  }

  /** Parse Response */
  try {
    return jsonResponse as T;
  } catch {
    throw new ApiParseErrorException();
  }
}
