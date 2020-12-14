import {Events} from "../events/events";
import {EventEnum} from "../events/event/event.enum";
import {Player} from "../game/entities/player/player";
import {TargetDirectionEnum} from "../game/components/targetDirection/targetDirection.enum";
import {Program} from "../program";
import {BadGuy} from "../game/entities/badGuy/badGuy";

export class Sandbox {

    static load = () => {
        Events.on(EventEnum.UPDATE, Sandbox.update);

        const pagoruPlayer = new Player('pagoru', { x: 0, y: 0 }, TargetDirectionEnum.NONE);

        const badGuy = new BadGuy({ x: 20, y: 0 });

        Program.getInstance().game.entities.addEntity(pagoruPlayer, badGuy);


    }

    static update = (delta: number) => {

    }

}
