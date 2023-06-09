import HttpStatusCode from "../http.code";
import BaseError from "../base.error";
export default class InternalServerError extends BaseError {
  constructor(message: string) {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR, message, false);
  }
}
