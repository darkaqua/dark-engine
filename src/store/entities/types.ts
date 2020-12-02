
import {
    IAddEntityAction,
    IAddEntityActionSuccess,
    IRemoveEntityAction,
    IRemoveEntityActionSuccess,
    IUpdateEntityAction,
    IUpdateEntityActionSuccess
} from "./actions";
import {ComponentTypes} from "../../game/components/component/component.types";

/** Action Types **/
export enum EntitiesActionTypes {
    ADD = 'ENTITIES@@ADD',
    ADD_SUCCESS = 'ENTITIES@@ADD_SUCCESS',

    UPDATE = 'ENTITIES@@UPDATE',
    UPDATE_SUCCESS = 'ENTITIES@@UPDATE_SUCCESS',

    REMOVE = 'ENTITIES@@REMOVE',
    REMOVE_SUCCESS = 'ENTITIES@@REMOVE_SUCCESS',
}

/** Action List **/
export type EntitiesActions =
    | IAddEntityAction<any>
    | IAddEntityActionSuccess<any>

    | IUpdateEntityAction<any>
    | IUpdateEntityActionSuccess<any>

    | IRemoveEntityAction
    | IRemoveEntityActionSuccess

/** Default State Values **/
export const entitiesDefaultState = (): EntitiesState => ({ });

/** State **/
export interface EntitiesState {
    [id: string]: ComponentTypes
}
