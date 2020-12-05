import {SystemAbstract} from "./system/system.abstract";
import {Movement} from "./movement/movement";
import {Renderable} from "./renderable/renderable";

export class Systems {

    private readonly systems: SystemAbstract[];

    constructor() {
        this.systems = [
            new Movement(),
            new Renderable()
        ];
    }

    get list() {
        return this.systems;
    }

    update(delta: number) {
        this.list.map(system => system.update(delta));
    }

}
