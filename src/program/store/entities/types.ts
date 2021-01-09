
import {
    IAddEntityAction,
    IAddEntityActionSuccess, IClearAllEntityAction, IClearAllEntityActionSuccess,
    IRemoveEntityAction,
    IRemoveEntityActionSuccess,
    IUpdateEntityAction,
    IUpdateEntityActionSuccess
} from "./actions";
import {ComponentTypes} from "../../game/components/component/component.types";
import {EntityEnum} from "../../game/entities/entity/entity.enum";

/** Action Types **/
export enum EntitiesActionTypes {
    ADD = 'ENTITIES@@ADD',
    ADD_SUCCESS = 'ENTITIES@@ADD_SUCCESS',

    UPDATE = 'ENTITIES@@UPDATE',
    UPDATE_SUCCESS = 'ENTITIES@@UPDATE_SUCCESS',

    REMOVE = 'ENTITIES@@REMOVE',
    REMOVE_SUCCESS = 'ENTITIES@@REMOVE_SUCCESS',

    CLEAR_ALL = 'ENTITIES@@CLEAR_ALL',
    CLEAR_ALL_SUCCESS = 'ENTITIES@@CLEAR_ALL_SUCCESS',
}

/** Action List **/
export type EntitiesActions =
    | IAddEntityAction<any>
    | IAddEntityActionSuccess<any>

    | IUpdateEntityAction<any>
    | IUpdateEntityActionSuccess<any>

    | IRemoveEntityAction
    | IRemoveEntityActionSuccess

    | IClearAllEntityAction
    | IClearAllEntityActionSuccess

/** Default State Values **/
export const entitiesDefaultState = (): EntitiesState => ({ });

/** State **/
export interface EntitiesState {
    [id: string]: BaseEntityType;
}
export type BaseEntityType = ComponentTypes & {
    entityId: string;
    entityEnum: EntityEnum;
}
