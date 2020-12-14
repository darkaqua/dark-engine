import {EntitiesActionTypes} from "./types";
import {EntityEnum} from "../../game/entities/entity/entity.enum";


/** Saga Actions **/
export interface IAddEntityAction<TEntityData> {
    type: typeof EntitiesActionTypes.ADD
    id: string;
    entityEnum: EntityEnum;
    entityData: TEntityData;
}
export interface IUpdateEntityAction<TEntityData> {
    type: typeof EntitiesActionTypes.UPDATE
    id: string;
    entityData: TEntityData;
}
export interface IRemoveEntityAction {
    type: typeof EntitiesActionTypes.REMOVE
    id: string;
}

/** Actions **/
export interface IAddEntityActionSuccess<TEntityData> {
    type: typeof EntitiesActionTypes.ADD_SUCCESS
    id: string;
    entityEnum: EntityEnum;
    entityData: TEntityData;
}
export interface IUpdateEntityActionSuccess<TEntityData> {
    type: typeof EntitiesActionTypes.UPDATE_SUCCESS
    id: string;
    entityData: TEntityData;
}
export interface IRemoveEntityActionSuccess {
    type: typeof EntitiesActionTypes.REMOVE_SUCCESS
    id: string;
}

