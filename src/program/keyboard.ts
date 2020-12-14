import {Events} from "./events/events";
import {EventEnum} from "./events/event/event.enum";

export class Keyboard {

    constructor() {
        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('keyup', this.onKeyUp, false);
    }

    private handler = (keyboardEvent: KeyboardEvent, isDown: boolean) => {
        Events.emit(EventEnum.KEYBOARD_KEY, { keyboardEvent, isDown })
    }

    private onKeyDown = (keyboardEvent: KeyboardEvent) => {
        keyboardEvent.preventDefault();
        this.handler(keyboardEvent, true);
    };

    private onKeyUp = (keyboardEvent: KeyboardEvent) => {
        keyboardEvent.preventDefault();
        this.handler(keyboardEvent, false);
    };

}
