import { Event } from './event';

export class IEventHandler<E extends IDictionary<Event>> {

    private readonly eventMap: E

    public constructor (eventMap: E) {
        this.eventMap = eventMap
    }

    /**
     * Gets an event by its name
     * @param name The name
     */
    public event (name: keyof E): Event {
        return this.eventMap[name]
    }
}
