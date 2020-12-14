import {ComponentAbstract} from "../component/component.abstract";
import {ComponentEnum} from "../component/component.enum";
import {PositionInterface} from "./position.interface";

export class Position extends ComponentAbstract<PositionInterface> {

    constructor() {
        super(
            ComponentEnum.POSITION,
            {
                [ComponentEnum.POSITION]: {
                    x: 0,
                    y: 0
                }
            }
        );
    }

}
