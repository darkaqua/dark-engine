import {SystemAbstract} from "./system/system.abstract";
import {Movement} from "./movement/movement";

export class Systems {

    private readonly systems: SystemAbstract[];

    constructor() {
        this.systems = [
            new Movement()
        ];
    }

    get list() {
        return this.systems;
    }

    update(delta: number) {
        this.systems.map(system => system.update(delta));
    }

}
