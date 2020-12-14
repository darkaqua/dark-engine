import * as PIXI from 'pixi.js';
import {SystemAbstract} from "../system/system.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {PositionInterface} from "../../components/position/position.interface";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {ContainerInterface} from "../../components/container/container.interface";
import {Program} from "../../../program";
import {TagInterface} from "../../components/tag/tag.interface";

export class RenderableContainer extends SystemAbstract {

    constructor() {
        super([
            ComponentEnum.POSITION,
            ComponentEnum.CONTAINER
        ]);
    }

    initEntity(entity: EntityAbstract) {
        const {
            [ComponentEnum.POSITION]: position,
            [ComponentEnum.CONTAINER]: container
        } = entity.getData<PositionInterface & ContainerInterface & TagInterface>();

        if(!container.visible) return;

        const entityContainer = new PIXI.Container();
        entityContainer.name = entity.id;
        entityContainer.width = 100;
        entityContainer.height = 100;
        entityContainer.position.set(position.x, position.y);
        entityContainer.interactive = true;
        entityContainer.on('click', () => {
            console.log('click', entity.id)
        });

        Program.getInstance().canvas.stage.addChild(entityContainer);
    }

    updateEntity(delta: number, entity: EntityAbstract) {
        const {
            [ComponentEnum.CONTAINER]: container
        } = entity.getData<ContainerInterface>();
        const canvas = Program.getInstance().canvas;

        const containerEntity = canvas.stage.getChildByName(entity.id);

        if(!containerEntity || container.visible) return;

        canvas.stage.removeChild(containerEntity);
    }

}
