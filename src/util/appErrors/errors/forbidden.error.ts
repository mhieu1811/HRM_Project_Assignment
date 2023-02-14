import HttpStatusCode from "../http.code";
import BaseError from "../base.error";
export default class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(HttpStatusCode.FORBIDDEN, message, true);
  }
}
