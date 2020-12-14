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

    initEntity(entity: EntityAbstract) {
    }

    updateEntity(delta: number, entity: EntityAbstract) {
        const {
            [ComponentEnum.POSITION]: position,
            [ComponentEnum.SPRITE]: sprite,
            [ComponentEnum.FOLLOW_CAMERA]: followCamera
        } = entity.getData<PositionInterface & SpriteInterface & FollowCameraInterface>();

        if(!followCamera.follow || !sprite || !sprite.visible) return;

        const { position: cameraPosition } = Program.getInstance().canvas.camera;

        const entityContainer = Program.getInstance().canvas.stage.getChildByName(entity.id);
        if(entityContainer)
            entityContainer.position.set(-cameraPosition.x, -cameraPosition.y);

        position.x = -cameraPosition.x;
        position.y = -cameraPosition.y;

        entity.updateData<PositionInterface>({ [ComponentEnum.POSITION]: position });

    }

}
