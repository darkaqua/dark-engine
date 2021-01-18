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
    private readonly store: Store<DefaultState, Actions>;

    constructor(store: Store<DefaultState, Actions>) {
        this.components = new Map<ComponentEnum, ComponentAbstract<any>>();
        this.store = store;

        this.add(ComponentEnum.POSITION, new Position());
        this.add(ComponentEnum.TAG, new Tag());
        this.add(ComponentEnum.TARGET_DIRECTION, new TargetDirection());
        this.add(ComponentEnum.CONTAINER, new Container());
        this.add(ComponentEnum.SPRITE, new Sprite());
        this.add(ComponentEnum.FOLLOW_CAMERA, new FollowCamera());
    }

    get list() {
        return this.components;
    }

    get<TComponentType extends ComponentTypes>(
        componentEnum: ComponentEnum
    ): ComponentAbstract<TComponentType> {
        return this.list.get(componentEnum);
    }

    private add<TComponentType extends ComponentTypes>(
        componentEnum: ComponentEnum,
        component: ComponentAbstract<TComponentType>
    ) {
        this.store.dispatch(addComponentDispatchAction(componentEnum));
        this.components.set(componentEnum, component);
    }


}
