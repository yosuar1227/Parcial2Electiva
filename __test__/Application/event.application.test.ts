import { Event } from "../../src/Application/event.application";
import { InternalError } from "../../src/Domain/Errors/InternalError";
import { NotCreated } from "../../src/Domain/Errors/NotCreated";
import { NotFound } from "../../src/Domain/Errors/NotFound";
import { NotUpdated } from "../../src/Domain/Errors/NotUpdated";
import {
  IEvent,
  IEventCreate,
} from "../../src/Domain/interfaces/Event.interfaces";
import { IEventServices } from "../../src/Domain/Services/IEvent.services";
import { IGenerateIdService } from "../../src/infrastructure/interface/IGenerateId.interface";

describe("Test use case register event", () => {
  // ARRANGE
  class EventServiceMock implements IEventServices {
    async create(event: IEventCreate): Promise<IEvent> {
      return {
        id: "1",
        title: "Example Event",
        description: "Event description",
        date: new Date(),
        location: "Event location",
        organizer: "Organizer",
      };
    }

    async getById(id: IEvent["id"]): Promise<IEvent> {
      return {
        id: "1",
        title: "Example Event",
        description: "Event description",
        date: new Date(),
        location: "Event location",
        organizer: "Organizer",
      };
    }

    async update(id: string, event: Partial<IEvent>): Promise<IEvent> {
      return {
        id: id,
        ...event,
        date: new Date(),
      } as IEvent;
    }

    async delete(id: string): Promise<IEvent> {
      return {
        id,
        title: "Example Event",
        description: "Event description",
        date: new Date(),
        location: "Event location",
        organizer: "Organizer",
      };
    }

    async getAll(): Promise<IEvent[]> {
      return [
        {
          id: "1",
          title: "Event 1",
          description: "Description 1",
          date: new Date(),
          location: "Location 1",
          organizer: "Organizer 1",
        },
        {
          id: "2",
          title: "Event 2",
          description: "Description 2",
          date: new Date(),
          location: "Location 2",
          organizer: "Organizer 2",
        },
      ];
    }
  }

  class EventServiceErrorMock implements IEventServices {
    async create(event: IEventCreate): Promise<IEvent> {
      throw new NotCreated(); // Simulamos el error de creación
    }

    async getById(id: IEvent["id"]): Promise<IEvent> {
      throw new NotFound();
    }

    async getAll(): Promise<IEvent[]> {
      throw new NotFound();
    }

    async update(id: IEvent["id"], event: Partial<IEvent>): Promise<IEvent> {
      throw new NotUpdated();
    }

    async delete(id: IEvent["id"]): Promise<IEvent> {
      throw new InternalError();
    }
  }

  let useCase: Event;
  let useCaseEventError: Event;
  let generateIdSrvMock: IGenerateIdService;
  let eventSrvMock: IEventServices;
  let eventSrvErrorMock: IEventServices;

  beforeEach(() => {
    eventSrvMock = new EventServiceMock();
    eventSrvErrorMock = new EventServiceErrorMock();
    useCase = new Event(eventSrvMock);
    useCaseEventError = new Event(eventSrvErrorMock);
  });

  // Test para registrar un evento con éxito
  it("Should register an event successfully", async () => {
    // ARRANGE
    const event: IEventCreate = {
      title: "Example Event",
      description: "Event description",
      date: new Date(),
      location: "Event location",
      organizer: "Organizer",
    };

    // ACT
    const response = await useCase.createEvent(event);

    // ASSERT
    expect(response).toStrictEqual({
      id: "1",
      title: "Example Event",
      description: "Event description",
      date: expect.any(Date),
      location: "Event location",
      organizer: "Organizer",
    });
  });

  // Test para cuando falla la creación del evento
  it("Should throw NotCreated when event creation fails", async () => {
    const event: IEventCreate = {
      title: "Example Event",
      description: "Event description",
      date: new Date(),
      location: "Event location",
      organizer: "Organizer",
    };

    try {
      await useCaseEventError.createEvent(event);
    } catch (error) {
      expect(error).toBeInstanceOf(NotCreated);
    }
  });

  // Test para obtener todos los eventos
  it("Should get all events successfully", async () => {
    const response = await useCase.getAll();

    expect(response).toStrictEqual([
      {
        id: "1",
        title: "Event 1",
        description: "Description 1",
        date: expect.any(Date),
        location: "Location 1",
        organizer: "Organizer 1",
      },
      {
        id: "2",
        title: "Event 2",
        description: "Description 2",
        date: expect.any(Date),
        location: "Location 2",
        organizer: "Organizer 2",
      },
    ]);
  });

  // Test para cuando falla la obtención de todos los eventos
  it("Should throw NotFound when no events are found", async () => {
    try {
      await useCaseEventError.getAll();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
    }
  });

  // Test para obtener un evento por ID con éxito
  it("Should get event by ID successfully", async () => {
    const response = await useCase.getById("1");

    expect(response).toStrictEqual({
      id: "1",
      title: "Example Event",
      description: "Event description",
      date: expect.any(Date),
      location: "Event location",
      organizer: "Organizer",
    });
  });

  // Test para cuando falla la obtención de un evento por ID
  it("Should throw NotFound when event is not found", async () => {
    try {
      await useCaseEventError.getById("1");
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
    }
  });

  // Test para actualizar un evento con éxito
  it("Should update an event successfully", async () => {
    const updatedEvent = { title: "Updated Event" };
    const response = await useCase.updateEvent("1", updatedEvent);

    console.log(response);

    expect(response).toStrictEqual({
      id: "1",
      title: "Updated Event",
      description: "Event description",
      date: expect.any(Date),
      location: "Event location",
      organizer: "Organizer",
    });
  });

  // Test para cuando falla la actualización de un evento
  it("Should throw NotUpdated when event update fails", async () => {
    const updatedEvent = { title: "Updated Event" };
    try {
      await useCaseEventError.updateEvent("1", updatedEvent);
    } catch (error) {
      expect(error).toBeInstanceOf(NotUpdated);
    }
  });

  // Test para eliminar un evento con éxito
  it("Should delete an event successfully", async () => {
    const response = await useCase.deleteEvent("1");

    expect(response).toStrictEqual({
      id: "1",
      title: "Example Event",
      description: "Event description",
      date: expect.any(Date),
      location: "Event location",
      organizer: "Organizer",
    });
  });

  // Test para cuando falla la eliminación de un evento
  it("Should throw InternalError when event deletion fails", async () => {
    try {
      await useCaseEventError.deleteEvent("1");
    } catch (error) {
      expect(error).toBeInstanceOf(InternalError);
    }
  });
});
