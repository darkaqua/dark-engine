import * as PIXI from 'pixi.js';
import {SystemAbstract} from "../system/system.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {PositionInterface} from "../../components/position/position.interface";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {ContainerInterface} from "../../components/container/container.interface";
import {Program} from "../../../program";
import {TagInterface} from "../../components/tag/tag.interface";

export class Renderable extends SystemAbstract {

    constructor() {
        super([
            ComponentEnum.POSITION,
            ComponentEnum.CONTAINER,
            ComponentEnum.TAG
        ]);
    }

    initEntity(entity: EntityAbstract) {
        const { position, container, tag } = entity.getData<PositionInterface & ContainerInterface & TagInterface>();

        if(!container.visible) return;

        const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        sprite.name = entity.id;
        sprite.position.set(position.x, position.y);
        sprite.interactive = true;
        sprite.on('click', () => {
            console.log(tag.username)
        })

        Program.getInstance().canvas.stage.addChild(sprite);
    }

    updateEntity(delta: number, entity: EntityAbstract) {
        const { container } = entity.getData<ContainerInterface>();
        const canvas = Program.getInstance().canvas;

        const containerEntity = canvas.stage.getChildByName(entity.id);

        if(!containerEntity || container.visible) return;

        canvas.stage.removeChild(containerEntity);
    }

}
