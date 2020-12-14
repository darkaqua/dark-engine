import {CallbackEventType} from "../callback/callback.type";

export type EventType = {
    subscriberList: {
        id: string,
        callback: CallbackEventType
    }[],
    emitted: boolean;
    dataEmitted?: any;
}
