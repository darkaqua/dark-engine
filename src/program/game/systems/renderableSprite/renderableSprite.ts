import * as PIXI from 'pixi.js';
import {SystemAbstract} from "../system/system.abstract";
import {ComponentEnum} from "../../components/component/component.enum";
import {PositionInterface} from "../../components/position/position.interface";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {Program} from "../../../program";
import {TagInterface} from "../../components/tag/tag.interface";
import {SpriteInterface} from "../../components/sprite/sprite.interface";
import {TextureEnum} from "../../../canvas/textures/texture/texture.enum";

export class RenderableSprite extends SystemAbstract {

    constructor() {
        super([
            ComponentEnum.POSITION,
            ComponentEnum.SPRITE
        ]);
    }

    onInitEntity(entity: EntityAbstract) {
        const [
            sprite,
            { position },
            tag
        ] = entity.getComponentData<[
            SpriteInterface,
            PositionInterface,
            TagInterface
        ]>(
            ComponentEnum.SPRITE,
            ComponentEnum.POSITION,
            ComponentEnum.TAG
        );

        if(!sprite.visible) return;

        const spriteEntity = new PIXI.Sprite(Program.getInstance().canvas.textures.get(sprite.texture as TextureEnum));
        spriteEntity.name = entity.id;
        spriteEntity.position.set(position.x, position.y);
        spriteEntity.interactive = true;
        spriteEntity.on('click', () => {
            if(tag)
                console.log(tag.username);
        });

        if(tag) {
            const text = new PIXI.Text(tag.username, new PIXI.TextStyle({
                fontSize: 5,
                fill: '#9bbc0f'
            }));
            text.position.set(-4, -8);

            spriteEntity.addChild(text);
        }

        Program.getInstance().canvas.stage.addChild(spriteEntity);
    }

    onUpdateEntity(delta: number, entity: EntityAbstract) {
        const [
            sprite,
            { position }
        ] = entity.getComponentData<[
            SpriteInterface,
            PositionInterface,
            TagInterface
        ]>(
            ComponentEnum.SPRITE,
            ComponentEnum.POSITION
        );

        const canvas = Program.getInstance().canvas;

        const spriteEntity = canvas.stage.getChildByName(entity.id);

        if(spriteEntity && sprite.visible) {
            const entityContainer = Program.getInstance().canvas.stage.getChildByName(entity.id);
            if(entityContainer)
                entityContainer.position.set(position.x, position.y);
        }

        if(!spriteEntity || sprite.visible) return;

        canvas.stage.removeChild(spriteEntity);
    }

    protected onRemoveEntity(entity: EntityAbstract) {
        const { stage } = Program.getInstance().canvas;
        stage.removeChild(stage.getChildByName(entity.id))
    }

}
