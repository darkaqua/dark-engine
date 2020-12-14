import * as PIXI from 'pixi.js';
import {Program} from "../program";
import {EventEnum} from "../events/event/event.enum";
import {Events} from "../events/events";

export class Camera  {

    private _scale: number;

    private _targetStagePosition: PIXI.IPoint;

    constructor() {
        this._scale = 3;

        Events.on(EventEnum.WINDOW_RESIZE, this.onWindowResize);
        Events.on(EventEnum.UPDATE, this.update);
    }

    private onWindowResize = () => {
        this.refresh();
    }

    get scale() {
        return this._scale;
    }

    set scale(scale: number){
        if(scale < 1 || scale > 4) return;
        this._scale = scale;
        this.refresh();
    }

    get position() {
        return Program.getInstance().canvas.stage.position;
    }

    public update = (delta: number) => {
        const { canvas } = Program.getInstance();
        const { position } = canvas.stage;

        const target = this._targetStagePosition;

        if(!target) return;

        const targetMove = {
            x: position.x - target.x,
            y: position.y - target.y
        }

        if(targetMove.x === 0 && targetMove.y === 0)
            return this._targetStagePosition = undefined;

        const targetDeltaMove = {
            x: targetMove.x === 0 ? 0 : (targetMove.x > 0 ? - delta : delta),
            y: targetMove.y === 0 ? 0 : (targetMove.y > 0 ? - delta : delta)
        }

        const deltaTargetCorrection = {
            x: Math.abs(targetMove.x) - Math.abs(targetDeltaMove.x),
            y: Math.abs(targetMove.y) - Math.abs(targetDeltaMove.y),
        }

        if(deltaTargetCorrection.x < 0)
            targetDeltaMove.x += targetMove.x > 0 ? - deltaTargetCorrection.x : deltaTargetCorrection.x;

        if(deltaTargetCorrection.y < 0)
            targetDeltaMove.y += targetMove.y > 0 ? - deltaTargetCorrection.y : deltaTargetCorrection.y;

        position.x += targetDeltaMove.x;
        position.y += targetDeltaMove.y;
        this.dispatchRefreshEvent();

    }

    public set = (targetPosition: PIXI.IPointData) => {
        const { position } = Program.getInstance().canvas.stage;
        this._targetStagePosition = undefined;

        position.copyFrom(targetPosition);

        this.dispatchRefreshEvent();
    }

    public move = (position: PIXI.IPointData) => {
        const { canvas } = Program.getInstance();

        this._targetStagePosition = new PIXI.Point(
            canvas.stage.position.x + position.x,
            canvas.stage.position.y + position.y
        );
    }

    public refresh = () => {
        const { canvas, window } = Program.getInstance();
        const { renderer, stage, view } = canvas;

        const rendererSize = {
            width: window.width / this.scale,
            height: window.height / this.scale
        }

        renderer.resolution = window.dpi * this.scale;
        // Stage resolution adjustment
        renderer.plugins.interaction.resolution = renderer.resolution;
        renderer.resize(rendererSize.width, rendererSize.height);

        view.style.width = `${window.width}px`;
        view.style.height = `${window.height}px`;

        stage.pivot.set(
            - Math.trunc(rendererSize.width / 2),
            - Math.trunc(rendererSize.height / 2)
        );

        this.dispatchRefreshEvent();
    }

    private dispatchRefreshEvent = () =>
        Events.emit(EventEnum.CAMERA_UPDATE);

}
