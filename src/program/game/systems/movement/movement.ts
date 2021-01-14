import {SystemAbstract} from "../system/system.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {PositionInterface} from "../../components/position/position.interface";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {TargetDirectionInterface} from "../../components/targetDirection/targetDirection.interface";
import {TargetDirectionEnum} from "../../components/targetDirection/targetDirection.enum";

export class Movement extends SystemAbstract {

    constructor() {
        super([
            ComponentEnum.POSITION,
            ComponentEnum.TARGET_DIRECTION
        ]);
    }

    onUpdateEntity(delta: number, entity: EntityAbstract) {
        const { position } = entity.getComponentData<PositionInterface>(ComponentEnum.POSITION);
        const targetDirection = entity.getComponentData<TargetDirectionInterface>(ComponentEnum.TARGET_DIRECTION);

        switch (targetDirection.direction) {
            // case TargetDirectionEnum.NONE:
            //     return;
            case TargetDirectionEnum.TOP:
                position.y += delta;
                break;
            case TargetDirectionEnum.RIGHT:
                position.x -= delta;
                break;
            case TargetDirectionEnum.BOTTOM:
                position.y -= delta;
                break;
            case TargetDirectionEnum.LEFT:
                position.x += delta;
                break;
        }

        entity.updateComponentData<PositionInterface>(ComponentEnum.POSITION, { position });
    }

}
