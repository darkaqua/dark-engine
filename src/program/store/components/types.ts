
import {
    IAddComponentAction, IAddComponentActionSuccess,
    IAddEntityComponentAction,
    IAddEntityComponentActionSuccess, IClearAllEntitiesComponentAction, IClearAllEntitiesComponentActionSuccess,
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
    REMOVE_ENTITY_SUCCESS = 'COMPONENTS@@REMOVE_ENTITY_SUCCESS',

    CLEAR_ALL_ENTITIES = 'COMPONENTS@@CLEAR_ALL_ENTITIES',
    CLEAR_ALL_ENTITIES_SUCCESS = 'COMPONENTS@@CLEAR_ALL_ENTITIES_SUCCESS'
}

/** Action List **/
export type ComponentsActions =
    | IAddComponentAction
    | IAddComponentActionSuccess

    | IAddEntityComponentAction<any>
    | IAddEntityComponentActionSuccess

    | IRemoveEntityComponentAction
    | IRemoveEntityComponentActionSuccess

    | IClearAllEntitiesComponentAction
    | IClearAllEntitiesComponentActionSuccess

/** Default State Values **/
export const componentsDefaultState = (): ComponentsState =>
    Object.keys(ComponentEnum).reduce((a, b, c) => ({
        ...a,
        [b]: {  entities: [] }
    }), {}) as ComponentsState

/** State **/
export type ComponentsState = {
    [id in ComponentEnum]: ComponentInterface
};