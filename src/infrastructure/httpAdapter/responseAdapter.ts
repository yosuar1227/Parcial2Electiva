
import { Request, Response } from "express";
import { NotCreated } from "../../Domain/Errors/NotCreated";
import { NotFound } from "../../Domain/Errors/NotFound";
import { ERROR_MESSAGES } from "../../Domain/Errors/ErrorMessages";

export class ResponseAdapter {
    static handler(func: Promise<any>, res: Response) {
        func.then(data => {
            res.status(200).send(data);
        }).catch((error) => {
            if(error instanceof NotCreated) {
                res.status(400).send({
                    msg: error.message
                });
            } else if(error instanceof NotFound) {
                res.status(404).send({
                    msg: error.message
                });
            } else {
                res.status(500).send({
                    msg: ERROR_MESSAGES.INTERNAL_ERROR
                });
            }
        });
    }
}