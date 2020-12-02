import {ComponentEnum} from "../../components/component/component.enum";
import {getComponentEntities} from "../../../store/components";
import {Factory} from "../../../factory";
import {EntityAbstract} from "../../entities/entity/entity.abstract";

export abstract class SystemAbstract {

    public readonly components: ComponentEnum[];

    protected constructor(
        components: ComponentEnum[] = []
    ) {
        this.components = components;
    }

    abstract updateEntity(delta: number, entity: EntityAbstract);

    update(delta: number) {
        this.getEntities().map(entity => this.updateEntity(delta, entity));
    }

    getEntities(): EntityAbstract[] {
        const factory = Factory.getInstance();
        const entityList = this.components.map(getComponentEntities).flat(2);
        const entityCountMap = new Map([...new Set(entityList)].map(x => [x, entityList.filter(y => y === x).length] ));
        return [...new Set(entityList.filter(o => entityCountMap.get(o) === this.components.length))]
            .map(entityId => factory.entitiesFactory.getEntity(entityId));
    }

}
