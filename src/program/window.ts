import {EventEnum} from "./events/event/event.enum";
import {Events} from "./events/events";

export class Window {

    public width: number;
    public height: number;
    public dpi: number;
    public isFocus: boolean;
    public cursorPosition: { x: number, y: number };

    private focusDateTime: number;

    constructor() {
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('load', this.onWindowResize);

        window.document.addEventListener('visibilitychange', this.onVisibilityChange, false);

        // cursor
        window.addEventListener('contextmenu', this.onContextMenu);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mousedown', this.onMouseDown);

        this.width = 0;
        this.height = 0;
        this.dpi = 0;
        this.isFocus = true;
        this.cursorPosition = { x: 0, y: 0 };
        this.focusDateTime = 0;
    }

    private onWindowResize = () => {
        const { innerWidth, innerHeight, devicePixelRatio } = window;

        this.width = innerWidth % 2 ? innerWidth + 1 : innerWidth;
        this.height = innerHeight % 2 ? innerHeight + 1 : innerHeight;
        this.dpi = devicePixelRatio;

        Events.emit(EventEnum.WINDOW_RESIZE);
    }

    private onVisibilityChange = () => {
        this.isFocus = !document.hidden;

        if(this.isFocus) {
            const elapsedTime = Date.now() - this.focusDateTime;
            if(!isNaN(elapsedTime))
                return Events.emit(EventEnum.FOCUS_IN, { elapsedTime });
        }
        this.focusDateTime = Date.now();
        Events.emit(EventEnum.FOCUS_OUT);
    }

    private onContextMenu = (event: MouseEvent) => {
        Events.emit(EventEnum.CURSOR_RIGHT, event);
        event.preventDefault();
    };

    private onMouseMove = (event: MouseEvent) => {
        this.cursorPosition = { x: event.pageX, y: event.pageY };
        Events.emit(EventEnum.CURSOR_MOVE, event);
    };

    private onMouseDown = (event: MouseEvent) => {
        Events.emit(EventEnum.CURSOR_LEFT, event);
        event.preventDefault();
    }

}
