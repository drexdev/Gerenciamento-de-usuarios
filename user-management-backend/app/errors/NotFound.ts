import { InternalError } from "./InternalError";

export class NotFound extends InternalError {
  constructor(message: string | string[]) {
    super(404, message);
  }
}
