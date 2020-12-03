import {Entities} from "./entities/entities";
import {Components} from "./components/components";
import {Systems} from "./systems/systems";
import {Store} from "redux";
import {Actions, DefaultState} from "../store/store.definitions";

export class Game {

    public readonly entities: Entities;
    public readonly components: Components;
    public readonly systems: Systems;

    constructor(store: Store<DefaultState, Actions>) {
        this.entities = new Entities();
        this.components = new Components(store);
        this.systems = new Systems();
    }

}
