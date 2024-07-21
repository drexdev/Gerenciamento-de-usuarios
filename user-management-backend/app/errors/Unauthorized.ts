import { InternalError } from "./InternalError";

export class Unauthorized extends InternalError {
  constructor(message: string | string[]) {
    super(401, message);
  }
}
