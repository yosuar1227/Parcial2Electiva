import { ERROR_MESSAGES } from "./ErrorMessages";

export class NotCreated extends Error {
    constructor() {
        super(ERROR_MESSAGES.NOT_CREATED);
    }
}