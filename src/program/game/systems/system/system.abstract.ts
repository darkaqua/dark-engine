import {ComponentEnum} from "../../components/component/component.enum";
import {Program} from "../../../program";
import {EntityAbstract} from "../../entities/entity/entity.abstract";
import {ComponentTypes} from "../../components/component/component.types";

export abstract class SystemAbstract {

    public readonly components: ComponentEnum[];

    private lastUpdateEntityIdList: string[];

    protected constructor(
        components: ComponentEnum[] = []
    ) {
        this.components = components;
        this.lastUpdateEntityIdList = [];
    }

    /**
     * Called when an entity is available on the system
     * @param entity
     * @protected
     */
    protected onInitEntity(entity: EntityAbstract) {};

    /**
     * Called every frame
     * @param delta
     * @param entity
     * @protected
     */
    protected onUpdateEntity(delta: number, entity: EntityAbstract) {};

    /**
     * Called when some of the entity data is changed
     * @param entity
     * @param componentEnums: Array {ComponentEnum[]} containing every componentEnum changed
     * @param oldEntityData
     * @param newEntityData
     * @protected
     */
    protected onDataEntityUpdate(
        entity: EntityAbstract,
        componentEnums: ComponentEnum[],
        oldEntityData: ComponentTypes,
        newEntityData: ComponentTypes
    ) {};

    /**
     * Called when the entity is removed from the system
     * @param entity
     * @protected
     */
    protected onRemoveEntity(entity: EntityAbstract) {};

    /**
     * Returns {string[]} containing all the entities id
     * @protected
     */
    protected getEntityIdList(): string[] {
        const { components } = Program.getInstance().store.getState();
        return this.components.map(componentEnum => components[componentEnum].entities).flat(2);
    }

    /**
     * Returns {EntityAbstract} or undefined if the entity doesn't exists on the current system
     * @param id
     * @public
     */
    public getEntity(id: string): EntityAbstract | undefined {
        return this.getEntities().find(entity => entity?.id === id);
    }

    /**
     * Returns {EntityAbstract[]} with all the entities inside the system.
     * @public
     */
    public getEntities(): EntityAbstract[] {
        const program = Program.getInstance();
        const entityList = this.getEntityIdList();
        const entityCountMap = new Map([...new Set(entityList)].map(x => [x, entityList.filter(y => y === x).length] ));
        return [...new Set(entityList.filter(o => entityCountMap.get(o) === this.components.length))]
            .map(entityId => program.game.entities.get(entityId))
            .filter(entity => entity);
    }

    public _update(delta: number) {
        const entityList = this.getEntities();
        // Update every entity
        entityList
            .filter(e => e)
            .map(entity => this.onUpdateEntity(delta, entity));
        // Init every new entity;
        entityList
            .filter(e => e)
            .filter(entity => !this.lastUpdateEntityIdList.some(entityId => entity.id === entityId))
            .map(entity => this.onInitEntity(entity));
        // Update the entity list;
        this.lastUpdateEntityIdList = this.getEntityIdList();
    }

    public _stop() {
        this.lastUpdateEntityIdList = [];
    }

    public _remove(entityId: string) {
        this.onRemoveEntity(this.getEntity(entityId));
    }

    public _updateEntityData(entityId: string, entityData: ComponentTypes) {
        const entity = this.getEntity(entityId);
        if(!entity) return;
        const entityOldData = entity.getRawData()
        const componentEnums = Object.keys(entityData) as ComponentEnum[];

        // Only update when componentEnum is inside system;
        if(!componentEnums.some((componentEnum) => this.components.includes(componentEnum)))
            return;

        const filteredEntityOldData = entity.getComponents()
            .filter(componentEnum => JSON.stringify(entityOldData[componentEnum]) !== JSON.stringify(entityData[componentEnum]))
            .reduce((
                currentData,
                componentEnum
            ) => ({
                ...currentData,
                [componentEnum]: entityOldData[componentEnum]
            }), {} as ComponentTypes);

        this.onDataEntityUpdate(entity, componentEnums, filteredEntityOldData, entityData);
    }

}
