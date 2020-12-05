import {SystemAbstract} from "../system/system.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {PositionInterface} from "../../components/position/position.interface";
import {TagInterface} from "../../components/tag/tag.interface";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {TargetDirectionInterface} from "../../components/targetDirection/targetDirection.interface";
import {TargetDirectionEnum} from "../../components/targetDirection/targetDirection.enum";
import {ContainerInterface} from "../../components/container/container.interface";
import {Program} from "../../../program";

export class Movement extends SystemAbstract {

    constructor() {
        super([
            ComponentEnum.POSITION,
            ComponentEnum.TAG,
            ComponentEnum.TARGET_DIRECTION
        ]);
    }

    initEntity(entity: EntityAbstract) {

    }

    updateEntity(delta: number, entity: EntityAbstract) {
        const {
            position,
            tag,
            targetDirection,
            container
        } = entity.getData<PositionInterface & TagInterface & TargetDirectionInterface & ContainerInterface>()

        switch (targetDirection) {
            case TargetDirectionEnum.NONE:
                return;
            case TargetDirectionEnum.TOP:
                position.y--;
                break;
            case TargetDirectionEnum.RIGHT:
                position.x++;
                break;
            case TargetDirectionEnum.BOTTOM:
                position.y++;
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

        if(container && container.visible) {
            const entityContainer = Program.getInstance().canvas.stage.getChildByName(entity.id);
            if(entityContainer)
                entityContainer.position.set(position.x, position.y)
        }

        entity.updateData<PositionInterface>({ position });
    }

}
