import {ComponentEnum} from "../component/component.enum";

export interface SpriteInterface {
    [ComponentEnum.SPRITE]: {
        visible: true;
        texture?: string;
    }
}
