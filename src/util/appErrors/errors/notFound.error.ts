import HttpStatusCode from "../http.code";
import BaseError from "../base.error";
export default class NotFoundError extends BaseError {
  propertyName: string;

  constructor(propertyName: string) {
    super(HttpStatusCode.NOT_FOUND, `'${propertyName}' not found.`, true);

    this.propertyName = propertyName;
  }
}
