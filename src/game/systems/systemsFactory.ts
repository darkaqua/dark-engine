import {SystemAbstract} from "./system/system.abstract";
import {Movement} from "./movement/movement";

export class SystemsFactory {

    public readonly systems: SystemAbstract[];

    constructor() {
        this.systems = [
            new Movement()
        ];
    }

    update(delta: number) {
        this.systems.map(system => system.update(delta));
    }

}
