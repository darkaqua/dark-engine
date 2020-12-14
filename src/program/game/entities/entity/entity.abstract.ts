import {ComponentEnum} from "../../components/component/component.enum";
import {
    addEntityComponentDispatchAction,
    removeEntityComponentDispatchAction
} from "../../../store/components/dispatchers";
import {ComponentTypes} from "../../components/component/component.types";
import {getEntity} from "../../../store/entities";
import {addEntityDispatchAction, updateEntityDispatchAction} from "../../../store/entities/dispatchers";
import {v4} from "uuid";
import {Program} from "../../../program";
import {AddComponentInterface} from "../../components/component/component.types.map";
import {EntityEnum} from "./entity.enum";

const getStore = () => Program.getInstance().store;

export abstract class EntityAbstract {

    public readonly id: string;
    public readonly entityEnum: EntityEnum;

    protected constructor(
        entityEnum = EntityEnum.NONE
    ) {
        this.id = v4();
        this.entityEnum = entityEnum;
        getStore().dispatch(addEntityDispatchAction(this.id, this.entityEnum));
    }

    getData<TData extends ComponentTypes>() {
        return getEntity<TData>(this.id);
    }

    updateData<TData extends ComponentTypes>(data: TData) {
        getStore().dispatch(updateEntityDispatchAction<TData>(this.id, data))
    }

    addComponent: AddComponentInterface = (componentEnum, componentData) => {
        getStore().dispatch(addEntityComponentDispatchAction(componentEnum, this.id, componentData));
    }

    removeComponent(componentEnum: ComponentEnum) {
        getStore().dispatch(removeEntityComponentDispatchAction(componentEnum, this.id));
    }

}
