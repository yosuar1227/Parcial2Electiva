import { InternalError } from "../Domain/Errors/InternalError";
import { NotCreated } from "../Domain/Errors/NotCreated";
import { NotFound } from "../Domain/Errors/NotFound";
import { NotUpdated } from "../Domain/Errors/NotUpdated";
import { IEvent,IEventCreate } from "../Domain/interfaces/Event.interfaces";
import { IEventServices } from "../Domain/Services/IEvent.services";

export class Event {

    constructor(
        private readonly EventServ:IEventServices
    ){}

    async createEvent(event:IEventCreate){
        try {
            const newEvent = await this.EventServ.create(event)
            return newEvent
        } catch (error) {
            throw new NotCreated()
        }
    }

    async getAll(){
        try {
            const allEvent = await this.EventServ.getAll()
            return allEvent
        } catch (error) {
            throw new NotFound()
        }
    }
    async getById(id:string):Promise<IEvent | null>{
        try {
            const getEventById = await this.EventServ.getById(id);
            return getEventById
        } catch (error) {
            throw new NotFound();
        }
    }
    async updateEvent(id:string,event:Partial<IEvent>):Promise<IEvent | null>{
        try {
            const Event = await this.getById(id) 
            if(!Event) throw new NotFound()
            
           const eventUpdated = await this.EventServ.update(id,event)
            return eventUpdated
        } catch (error) {
            throw new NotUpdated()
        }
    }
    async deleteEvent(id:string):Promise<IEvent | null>{
        try {
            const Event = await this.getById(id) 
            if(!Event) throw new NotFound()
            
           const eventDeleted = await this.EventServ.delete(id)
            return eventDeleted;
        } catch (error) {
            throw new InternalError()
        }
    }



}