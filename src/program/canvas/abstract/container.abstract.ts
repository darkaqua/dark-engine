import * as PIXI from 'pixi.js';
import {EventManager} from "../../events/event/event.manager";

export abstract class ContainerAbstract extends PIXI.Container {

    public readonly eventManager: EventManager;

    protected constructor() {
        super();

        this.eventManager = new EventManager();

        this.on('added', this.onAdded.bind(this));
        this.on('removed', this.onRemoved.bind(this));
    }

    protected onAdded() {
        this.eventManager.onAdded();
        this.children.map((child: ContainerAbstract) => child.onAdded && child.onAdded());
    }
    protected onRemoved() {
        this.eventManager.onRemoved();
        this.children.map((child: ContainerAbstract) => child.onRemoved && child.onRemoved());
    }

}
