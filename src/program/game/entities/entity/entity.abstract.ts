import {ComponentEnum} from "../../components/component/component.enum";
import {
    addEntityComponentDispatchAction,
    removeEntityComponentDispatchAction
} from "../../../store/components/dispatchers";
import {ComponentTypes} from "../../components/component/component.types";
import {addEntityDispatchAction, updateEntityDispatchAction} from "../../../store/entities/dispatchers";
import {v4} from "uuid";
import {Program} from "../../../program";
import {EntityEnum} from "./entity.enum";
import {BaseEntityType} from "../../../store/entities";

const getStore = () => Program.getInstance().store;

export abstract class EntityAbstract {

    public readonly id: string;
    public readonly entityEnum: EntityEnum;

    protected constructor(
        entityEnum = EntityEnum.NONE,
        id: string = v4()
    ) {
        this.id = id;
        this.entityEnum = entityEnum;
        getStore().dispatch(addEntityDispatchAction(this.id, this.entityEnum));
    }

    getComponents(): ComponentEnum[] {
        return Object.keys(getStore().getState().entities[this.id])
            .filter(id => ComponentEnum[id]) as ComponentEnum[]
    }

    getComponentData<TComponentType extends ComponentTypes[]>(
        ...componentEnum: ComponentEnum[]
    ): TComponentType {
        const rawData = this.getRawData();
        return componentEnum.map(_componentEnum => rawData[_componentEnum]) as TComponentType;
    }

    getRawData(): (ComponentTypes & BaseEntityType) {
        return getStore().getState().entities[this.id];
    }

    hasComponent(componentEnum: ComponentEnum): boolean {
        return getStore().getState().components[componentEnum].entities.includes(this.id);
    }

    updateComponentData<TComponentType extends ComponentTypes>(
        componentEnum: ComponentEnum,
        componentData: TComponentType
    ) {
        getStore().dispatch(updateEntityDispatchAction(
            this.id,
            { [componentEnum]: componentData })
        );
    }

    addComponent(
        componentEnum: ComponentEnum,
        componentData: ComponentTypes
    ) {
        getStore().dispatch(addEntityComponentDispatchAction(
            componentEnum,
            this.id,
            { [componentEnum]: componentData })
        );
    }

    removeComponent(componentEnum: ComponentEnum) {
        getStore().dispatch(removeEntityComponentDispatchAction(componentEnum, this.id));
    }

}
