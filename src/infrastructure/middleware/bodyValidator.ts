import { NextFunction, Request, Response } from "express";
import Joi from "joi";


  export const schemaValidator = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const response = schema.validate(body);
            if(response.error) {
                res.status(400).send({
                    msg: "Opps! por favor verificar los campos"
                });
            } else {
                next();
            }
        } catch (error) {
           
        }
    };
};
