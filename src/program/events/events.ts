import {EventEnum} from "./event/event.enum";
import {CallbackEventType} from "./callback/callback.type";
import {EventType} from "./event/event.type";
import {v4} from "uuid";

export class Events {

    private static eventList: { [id in EventEnum]?: EventType } = {}

    public static getEvent = (eventEnum: EventEnum): EventType => {
        const { eventList } = Events;
        if(!eventList[eventEnum])
            eventList[eventEnum] = {
                emitted: false,
                subscriberList: []
            }
        return eventList[eventEnum];
    }

    static emit = (eventEnum: EventEnum, data?: any) => {
        const event = Events.getEvent(eventEnum);
        event.emitted = true;
        event.dataEmitted = data;
        event.subscriberList.forEach(subscriber => subscriber && subscriber.callback && subscriber.callback(data));
    }

    static on = (eventEnum: EventEnum, callback: CallbackEventType, emitIfAlready: boolean = false): string => {
        const event = Events.getEvent(eventEnum);
        const id = v4()
        event.subscriberList.push({ id, callback });

        if(emitIfAlready && event.emitted && callback)
            callback(event.dataEmitted);

        return id;
    }

    static remove = (eventEnum: EventEnum, eventId: string) => {
        const event = Events.getEvent(eventEnum);
        event.subscriberList = event.subscriberList
            .filter((data) => data.id !== eventId);
    }

}
