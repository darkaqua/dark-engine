import {SystemAbstract} from "./system/system.abstract";
import {Movement} from "./movement/movement";
import {RenderableSprite} from "./renderableSprite/renderableSprite";
import {RenderableContainer} from "./renderableContainer/renderableContainer";
import {Events} from "../../events/events";
import {EventEnum} from "../../events/event/event.enum";
import {Program} from "../../program";
import {ScreenEnum} from "../../canvas/screens/screen/screen.enum";
import {FollowCamera} from "./followCamera/followCamera";

export class Systems {

    private readonly systems: SystemAbstract[];

    constructor() {
        this.systems = [
            new Movement(),
            new RenderableSprite(),
            new RenderableContainer(),
            new FollowCamera()
        ];
        Events.on(EventEnum.UPDATE, this.update);
    }

    get list() {
        return this.systems;
    }

    stopAll() {
        this.list.forEach(system => system.stop());
    }

    update = (delta: number) => {
        if(Program.getInstance().canvas.getSelectedScreenEnum() !== ScreenEnum.GAME) return;
        this.list.forEach(system => system.update(delta));
    }

    getSystemsByEntityId(entityId: string): SystemAbstract[] {
        return Program.getInstance().game.systems.list
            .filter(system => system.getEntity(entityId));
    }

}
