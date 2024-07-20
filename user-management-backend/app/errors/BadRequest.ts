import { InternalError } from "./InternalError";

export class BadRequest extends InternalError {
  constructor(message: string | string[]) {
    super(400, message);
  }
}
