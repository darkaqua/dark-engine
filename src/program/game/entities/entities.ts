import {EntityAbstract} from "./entity/entity.abstract";
import {EntityTypes} from "./entity/entity.types";
import {Program} from "../../program";
import {removeEntityDispatchAction} from "../../store/entities/dispatchers";

export class Entities {

    private readonly entities: Map<string, EntityAbstract>;

    constructor() {
        this.entities = new Map<string, EntityAbstract>();
    }

    get list () {
        return this.entities;
    }

    get<TEntity extends EntityAbstract>(entityId: string): TEntity {
        return this.list.get(entityId) as TEntity;
    }

    addEntity(...entities: EntityTypes[]) {
        entities.map(entity => this.list.set(entity.id, entity))
        return this;
    }

    removeEntity(entityId: string): boolean {
        Program.getInstance().store.dispatch(removeEntityDispatchAction(entityId));
        return this.list.delete(entityId);
    }

}
