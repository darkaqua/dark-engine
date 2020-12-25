import {SystemAbstract} from "../system/system.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {PositionInterface} from "../../components/position/position.interface";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {TargetDirectionInterface} from "../../components/targetDirection/targetDirection.interface";
import {TargetDirectionEnum} from "../../components/targetDirection/targetDirection.enum";
import {SpriteInterface} from "../../components/sprite/sprite.interface";

export class Movement extends SystemAbstract {

    constructor() {
        super([
            ComponentEnum.POSITION,
            ComponentEnum.TARGET_DIRECTION
        ]);
    }

    initEntity(entity: EntityAbstract) {

    }

    updateEntity(delta: number, entity: EntityAbstract) {
        const {
            [ComponentEnum.POSITION]: position,
            [ComponentEnum.TARGET_DIRECTION]: targetDirection
        } = entity.getData<PositionInterface & TargetDirectionInterface & SpriteInterface>()

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

        entity.updateData<PositionInterface>({ [ComponentEnum.POSITION]: position });
    }

    protected onDataEntityUpdate(
        entity,
        componentEnums ,
        oldEntityData,
        newEntityData
    ) {

    }

}
