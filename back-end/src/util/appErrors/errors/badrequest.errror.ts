import HttpStatusCode from "../http.code";
import BaseError from "../base.error";
export default class BadRequest extends BaseError {
  constructor(message: string) {
    super(HttpStatusCode.BAD_REQUEST, message, true);
  }
}
