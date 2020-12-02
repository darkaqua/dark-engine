import {SystemAbstract} from "../system/system.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {PositionInterface} from "../../components/position/position.interface";
import {TagInterface} from "../../components/tag/tag.interface";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {TargetDirectionInterface} from "../../components/targetDirection/targetDirection.interface";
import {TargetDirectionEnum} from "../../components/targetDirection/targetDirection.enum";

export class Movement extends SystemAbstract {

    constructor() {
        super([
            ComponentEnum.POSITION,
            ComponentEnum.TAG,
            ComponentEnum.TARGET_DIRECTION
        ]);
    }

    updateEntity(delta: number, entity: EntityAbstract) {
        const { position, tag, targetDirection } = entity.getData<PositionInterface & TagInterface & TargetDirectionInterface>()

        switch (targetDirection) {
            case TargetDirectionEnum.NONE:
                return;
            case TargetDirectionEnum.TOP:
                position.y++;
                break;
            case TargetDirectionEnum.RIGHT:
                position.x++;
                break;
            case TargetDirectionEnum.BOTTOM:
                position.y--;
                break;
            case TargetDirectionEnum.LEFT:
                position.x--;
                break;
        }

        const entitiesCollided = this.getEntities().filter(entity => {
            const entityData = entity.getData<PositionInterface>();
            return entityData.position.x === position.x && entityData.position.y === position.y
        });

        if(entitiesCollided.length > 0) {
            entity.updateData<TargetDirectionInterface>({ targetDirection: TargetDirectionEnum.NONE });
            console.log(tag.username, 'collide with', entitiesCollided.map(e => e.getData<TagInterface>().tag.username));
            return;
        }

        console.log(tag.username, 'move', TargetDirectionEnum[targetDirection], position)

        entity.updateData<PositionInterface>({ position });
    }

}
