import { ERROR_MESSAGES } from "./ErrorMessages";

export class InternalError extends Error {
    constructor() {
        super(ERROR_MESSAGES.INTERNAL_ERROR);
    }
}