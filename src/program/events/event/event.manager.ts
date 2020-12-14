import {EventEnum} from "./event.enum";
import {CallbackEventType} from "../callback/callback.type";
import {Events} from "../events";

export class EventManager {

    private readonly eventMap: { eventEnum: EventEnum, callback: CallbackEventType }[];
    private readonly subscribedEventMap: Map<EventEnum, string>;

    constructor() {
        this.eventMap = [];
        this.subscribedEventMap = new Map<EventEnum, string>();
    }

    public subscribeEvent(eventEnum: EventEnum, callback: CallbackEventType){
        this.eventMap.push({ eventEnum, callback });
        this.subscribedEventMap
            .set(eventEnum, Events.on(eventEnum, callback));
    }

    public onAdded() {
        this.eventMap
            .filter(data => !this.subscribedEventMap.get(data.eventEnum))
            .map(data => this.subscribedEventMap.set(data.eventEnum, Events.on(data.eventEnum, data.callback)));
    }

    public onRemoved() {
        this.subscribedEventMap
            .forEach((id, eventEnum) => Events.remove(eventEnum, id));
        this.subscribedEventMap
            .clear();
    }

}
