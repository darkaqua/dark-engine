import * as PIXI from 'pixi.js';
import {EventManager} from "../../events/event/event.manager";

export abstract class SpriteAbstract extends PIXI.Sprite {

    public readonly eventManager: EventManager;

    protected constructor(
        texture?: PIXI.Texture
    ) {
        super(texture);

        this.eventManager = new EventManager();

        this.on('added', this.onAdded.bind(this));
        this.on('removed', this.onRemoved.bind(this));
    }

    protected onAdded() {
        this.eventManager.onAdded();
        this.children.map((child: SpriteAbstract) => child.onAdded && child.onAdded());
    }
    protected onRemoved() {
        this.eventManager.onRemoved();
        this.children.map((child: SpriteAbstract) => child.onRemoved && child.onRemoved());
    }

}
