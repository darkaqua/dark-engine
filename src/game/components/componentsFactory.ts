import {ComponentAbstract} from "./component/component.abstract";
import {ComponentEnum} from "./component/component.enum";
import {Position} from "./position/position";
import {Tag} from "./tag/tag";
import {TargetDirection} from "./targetDirection/targetDirection";
import {addComponentDispatchAction} from "../../store/components/dispatchers";
import {StoreFactory} from "../../store/storeFactory";

export class ComponentsFactory {

    public readonly components: Map<ComponentEnum, ComponentAbstract<any>>;

    constructor(storeFactory: StoreFactory) {
        this.components = new Map<ComponentEnum, ComponentAbstract<any>>();

        this.addComponent(storeFactory, ComponentEnum.POSITION, new Position());
        this.addComponent(storeFactory, ComponentEnum.TAG, new Tag());
        this.addComponent(storeFactory, ComponentEnum.TARGET_DIRECTION, new TargetDirection());
    }

    private addComponent(storeFactory: StoreFactory, componentEnum: ComponentEnum, component: ComponentAbstract<any>) {
        storeFactory.store.dispatch(addComponentDispatchAction(componentEnum));
        this.components.set(componentEnum, component);
    }


}
