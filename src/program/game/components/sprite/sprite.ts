
import {SpriteInterface} from "./sprite.interface";
import {ComponentEnum} from "../component/component.enum";
import {ComponentAbstract} from "../component/component.abstract";

export class Sprite extends ComponentAbstract<SpriteInterface> {

    constructor() {
        super(
            ComponentEnum.SPRITE,
            {
                [ComponentEnum.SPRITE]: {
                    visible: true,
                    texture: 'error'
                }
            }
        );
    }

}
