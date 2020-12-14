import {TargetDirectionEnum} from "./targetDirection.enum";
import {ComponentEnum} from "../component/component.enum";

export interface TargetDirectionInterface {
    [ComponentEnum.TARGET_DIRECTION]: {
        direction: TargetDirectionEnum
    };
}
