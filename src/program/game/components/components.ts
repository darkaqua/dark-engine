import {ComponentAbstract} from "./component/component.abstract";
import {ComponentEnum} from "./component/component.enum";
import {Position} from "./position/position";
import {Tag} from "./tag/tag";
import {TargetDirection} from "./targetDirection/targetDirection";
import {addComponentDispatchAction} from "../../store/components/dispatchers";
import {Store} from "redux";
import {Actions, DefaultState} from "../../store/store.definitions";
import {ComponentTypes} from "./component/component.types";
import {Container} from "./container/container";
import {Sprite} from "./sprite/sprite";
import {FollowCamera} from "./followCamera/followCamera";

export class Components {

    private readonly components: Map<ComponentEnum, ComponentAbstract<any>>;

    constructor(store: Store<DefaultState, Actions>) {
        this.components = new Map<ComponentEnum, ComponentAbstract<any>>();

        this.addComponent(store, ComponentEnum.POSITION, new Position());
        this.addComponent(store, ComponentEnum.TAG, new Tag());
        this.addComponent(store, ComponentEnum.TARGET_DIRECTION, new TargetDirection());
        this.addComponent(store, ComponentEnum.CONTAINER, new Container());
        this.addComponent(store, ComponentEnum.SPRITE, new Sprite());
        this.addComponent(store, ComponentEnum.FOLLOW_CAMERA, new FollowCamera());
    }

    get list() {
        return this.components;
    }

    get<TComponentType extends ComponentTypes>(
        componentEnum: ComponentEnum
    ): ComponentAbstract<TComponentType> {
        return this.list.get(componentEnum);
    }

    private addComponent<TComponentType extends ComponentTypes>(
        store: Store<DefaultState, Actions>,
        componentEnum: ComponentEnum,
        component: ComponentAbstract<TComponentType>
    ) {
        store.dispatch(addComponentDispatchAction(componentEnum));
        this.components.set(componentEnum, component);
    }


}
