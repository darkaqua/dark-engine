import {EntityAbstract} from "../entity/entity.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {TargetDirectionEnum} from "../../components/targetDirection/targetDirection.enum";

export class Player extends EntityAbstract {

    constructor(
        username: string,
        position: { x: number, y: number },
        targetDirection: TargetDirectionEnum
    ) {
        super();
        this.addComponent(ComponentEnum.TARGET_DIRECTION, { targetDirection } );
        this.addComponent(ComponentEnum.POSITION, { position } );
        this.addComponent(ComponentEnum.TAG, { tag: { username } });
    }

}
