import {ComponentAbstract} from "../component/component.abstract";
import {ComponentEnum} from "../component/component.enum";
import {TargetDirectionInterface} from "./targetDirection.interface";
import {TargetDirectionEnum} from "./targetDirection.enum";

export class TargetDirection extends ComponentAbstract<TargetDirectionInterface> {

    constructor() {
        super(
            ComponentEnum.TARGET_DIRECTION,
            {
                targetDirection: TargetDirectionEnum.NONE
            }
        );
    }

}
