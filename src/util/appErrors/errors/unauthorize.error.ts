import HttpStatusCode from "../http.code";
import BaseError from "../base.error";
export default class UnAuthorize extends BaseError {
  constructor(message: string) {
    super(HttpStatusCode.UNAUTHORIZED, message, true);
  }
}
