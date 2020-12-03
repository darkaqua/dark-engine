
import {
    IAddComponentAction, IAddComponentActionSuccess,
    IAddEntityComponentAction,
    IAddEntityComponentActionSuccess,
    IRemoveEntityComponentAction,
    IRemoveEntityComponentActionSuccess
} from "./actions";
import {ComponentEnum} from "../../game/components/component/component.enum";
import {ComponentInterface} from "../../game/components/component/component.interface";

/** Action Types **/
export enum ComponentsActionTypes {
    ADD = 'COMPONENTS@@ADD',
    ADD_SUCCESS = 'COMPONENTS@@ADD_SUCCESS',

    ADD_ENTITY = 'COMPONENTS@@ADD_ENTITY',
    ADD_ENTITY_SUCCESS = 'COMPONENTS@@ADD_ENTITY_SUCCESS',

    REMOVE_ENTITY = 'COMPONENTS@@REMOVE_ENTITY',
    REMOVE_ENTITY_SUCCESS = 'COMPONENTS@@REMOVE_ENTITY_SUCCESS'
}

/** Action List **/
export type ComponentsActions =
    | IAddComponentAction
    | IAddComponentActionSuccess

    | IAddEntityComponentAction<any>
    | IAddEntityComponentActionSuccess

    | IRemoveEntityComponentAction
    | IRemoveEntityComponentActionSuccess

/** Default State Values **/
export const componentsDefaultState = (): ComponentsState => <ComponentsState>({
    [ComponentEnum.POSITION]: { entities: [] },
    [ComponentEnum.TAG]: { entities: [] }
});

/** State **/
export type ComponentsState = {
    [id in ComponentEnum]: ComponentInterface;
};
