import {SystemAbstract} from "../system/system.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {PositionInterface} from "../../components/position/position.interface";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {Program} from "../../../program";
import {SpriteInterface} from "../../components/sprite/sprite.interface";
import {FollowCameraInterface} from "../../components/followCamera/followCamera.interface";

export class FollowCamera extends SystemAbstract {

    constructor() {
        super([
            ComponentEnum.POSITION,
            ComponentEnum.SPRITE,
            ComponentEnum.FOLLOW_CAMERA
        ]);
    }

    onUpdateEntity(delta: number, entity: EntityAbstract) {
        const [
            { position },
            sprite,
            followCamera
        ] = entity.getComponentData<[
            PositionInterface,
            SpriteInterface,
            FollowCameraInterface
        ]>(
            ComponentEnum.POSITION,
            ComponentEnum.SPRITE,
            ComponentEnum.FOLLOW_CAMERA
        );

        if(!followCamera.follow || !sprite || !sprite.visible) return;

        const { position: cameraPosition } = Program.getInstance().canvas.camera;

        const entityContainer = Program.getInstance().canvas.stage.getChildByName(entity.id);
        if(entityContainer)
            entityContainer.position.set(-cameraPosition.x, -cameraPosition.y);

        if(cameraPosition.equals(position)) return;

        const targetPosition = {
            x: cameraPosition.x,
            y: cameraPosition.y
        }

        entity.updateComponentData<[PositionInterface]>(
            [ComponentEnum.POSITION],
            [{ position: targetPosition }]
        );
    }

}
