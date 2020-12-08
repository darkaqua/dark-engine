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

const store = Program.getInstance().store;

export abstract class EntityAbstract {

    public readonly id: string;

    protected constructor() {
        this.id = v4();
        store.dispatch(addEntityDispatchAction(this.id));
    }

    getData<TData extends ComponentTypes>() {
        return getEntity<TData>(this.id);
    }

    updateData<TData extends ComponentTypes>(data: TData) {
        store.dispatch(updateEntityDispatchAction<TData>(this.id, data))
    }
   
    addComponent: AddComponentInterface = function(componentEnum, componentData) {
        store.dispatch(addEntityComponentDispatchAction(componentEnum, this.id, componentData));
    }

    removeComponent(componentEnum: ComponentEnum) {
        store.dispatch(removeEntityComponentDispatchAction(componentEnum, this.id));
    }

}
