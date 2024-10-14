import { ERROR_MESSAGES } from "./ErrorMessages";

export class NotUpdated extends Error {
  constructor() {
      super(ERROR_MESSAGES.NOT_UPDATED);
  }
}