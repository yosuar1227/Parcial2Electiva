import { ERROR_MESSAGES } from "./ErrorMessages";

export class NotFound extends Error {
    constructor() {
        super( ERROR_MESSAGES.NOT_FOUND);
    }
}