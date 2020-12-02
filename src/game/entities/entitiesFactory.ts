import {EntityAbstract} from "./entity/entity.abstract";
import {EntityTypes} from "./entity/entity.types";
import {Factory} from "../../factory";
import {removeEntityDispatchAction} from "../../store/entities/dispatchers";

export class EntitiesFactory {

    public readonly entities: Map<string, EntityAbstract>;

    constructor() {
        this.entities = new Map<string, EntityAbstract>();
    }

    addEntity(entity: EntityTypes) {
        this.entities.set(entity.id, entity);
    }

    getEntity<TEntity extends EntityAbstract>(entityId: string): TEntity {
        return this.entities.get(entityId) as TEntity;
    }

    removeEntity(entityId: string): boolean {
        Factory.getInstance().storeFactory.store.dispatch(removeEntityDispatchAction(entityId))
        return this.entities.delete(entityId);
    }

}
