import * as PIXI from 'pixi.js';
import {Program} from "../program";
import {Events} from "../events/events";
import {EventEnum} from "../events/event/event.enum";
import {isPositionInsideContainer} from "../utils/positions.utils";

export class Cursor extends PIXI.Sprite {

    constructor() {
        super(PIXI.Texture.EMPTY);
        this.visible = false;

        Events.on(EventEnum.LOAD, this.load)
        Events.on(EventEnum.CAMERA_UPDATE, this.onCameraUpdate);
        Events.on(EventEnum.CURSOR_MOVE, this.onCursorMove);

        this.zIndex = Number.MAX_SAFE_INTEGER;
    }

    private load = () => {
        this.texture = Program.getInstance().canvas.textures.get('cursor');
        this.texture.update();
    }

    private onCursorMove = () => {
        this.refresh()
    }

    private onCameraUpdate = () => {
        this.refresh();
    }

    public isInside = (position: PIXI.IPointData, size: PIXI.ISize): boolean => {
        return isPositionInsideContainer(this.position, position, size);
    }

    public refresh = () => {
        const { canvas, window } = Program.getInstance();
        const { cursorPosition } = window;
        const { camera } = canvas;

        const { position, scale } = camera;

        const pivot = canvas.stage.pivot;
        const canvasSize = canvas.getSize();

        this.position
            .set(
                Math.trunc(- (position.x) - canvasSize.width + (cursorPosition.x / scale) - pivot.x),
                Math.trunc(- (position.y) - canvasSize.height + (cursorPosition.y / scale) - pivot.y)
            );

    }
}
