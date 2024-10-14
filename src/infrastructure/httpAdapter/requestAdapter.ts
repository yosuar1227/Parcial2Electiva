
import { Request, Response, Router } from "express";
import { EventService } from "../service/Event.service";
import { GenerateIdService } from "../service/IGenerate.service";
import { ResponseAdapter } from "./responseAdapter";
import { Event } from "../../Application/event.application";
import { schemaValidator } from "../middleware/bodyValidator";
import { eventSchemaCreate, eventSchemaUpdate } from "../../utils/joiValidator";

const generateIdSrv = new GenerateIdService();
const eventSrv = new EventService(generateIdSrv);
const eventsUseCases = new Event(eventSrv);

const router = Router();

router.get("/", async (res: Response) => {
    ResponseAdapter.handler(eventsUseCases.getAll(), res);
});

router.get("/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    ResponseAdapter.handler(eventsUseCases.getById(id), res);
});

router.post("/", schemaValidator(eventSchemaCreate) ,async (req: Request, res: Response) => {
    const body = req.body;
    ResponseAdapter.handler(eventsUseCases.createEvent(body), res);
});

router.patch("/:id",schemaValidator(eventSchemaUpdate) ,async (req: Request, res: Response) => {
    const {id} = req.params;
    const body = req.body;
    ResponseAdapter.handler(eventsUseCases.updateEvent(id,body), res);
});

router.delete("/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    ResponseAdapter.handler(eventsUseCases.deleteEvent(id), res);
});



export {router};