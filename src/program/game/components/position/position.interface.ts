import * as PIXI from 'pixi.js';
import {ComponentEnum} from "../component/component.enum";

export interface PositionInterface {
    [ComponentEnum.POSITION]: PIXI.IPointData
}
