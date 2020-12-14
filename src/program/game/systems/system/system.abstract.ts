import {ComponentEnum} from "../../components/component/component.enum";
import {getComponentEntities} from "../../../store/components";
import {Program} from "../../../program";
import {EntityAbstract} from "../../entities/entity/entity.abstract";

export abstract class SystemAbstract {

    public readonly components: ComponentEnum[];

    private lastUpdateEntityIdList: string[];

    protected constructor(
        components: ComponentEnum[] = []
    ) {
        this.components = components;
        this.lastUpdateEntityIdList = [];
    }

    protected abstract initEntity(entity: EntityAbstract);
    protected abstract updateEntity(delta: number, entity: EntityAbstract);

    public update(delta: number) {
        const entityList = this.getEntities();
        // Update every entity
        entityList
            .map(entity => this.updateEntity(delta, entity));
        // Init every new entity;
        entityList
            .filter(entity => !this.lastUpdateEntityIdList.some(entityId => entity.id === entityId))
            .map(entity => this.initEntity(entity));
        // Update the entity list;
        this.lastUpdateEntityIdList = this.getEntityIdList();
    }

    public getEntityIdList(): string[] {
        return this.components.map(getComponentEntities).flat(2);
    }

    public getEntities(): EntityAbstract[] {
        const program = Program.getInstance();
        const entityList = this.getEntityIdList();
        const entityCountMap = new Map([...new Set(entityList)].map(x => [x, entityList.filter(y => y === x).length] ));
        return [...new Set(entityList.filter(o => entityCountMap.get(o) === this.components.length))]
            .map(entityId => program.game.entities.get(entityId));
    }

}
