
import {EntitiesActionTypes} from "./types";
import {
    IAddEntityAction,
    IAddEntityActionSuccess,
    IClearAllEntityAction,
    IClearAllEntityActionSuccess,
    IRemoveEntityAction,
    IRemoveEntityActionSuccess,
    IUpdateEntityAction,
    IUpdateEntityActionSuccess
} from "./actions";
import {EntityEnum} from "../../game/entities/entity/entity.enum";

/** Actions **/
export const addEntityDispatchAction = <TEntityData>(
    id: string,
    entityEnum: EntityEnum,
    entityData: TEntityData = {} as any
): IAddEntityAction<TEntityData> => ({
    type: EntitiesActionTypes.ADD,
    id,
    entityEnum,
    entityData
});
export const updateEntityDispatchAction = <TEntityData>(
    id: string,
    entityData: TEntityData
): IUpdateEntityAction<TEntityData> => ({
    type: EntitiesActionTypes.UPDATE,
    id,
    entityData
});
export const removeEntityDispatchAction = (
    id: string
): IRemoveEntityAction => ({
    type: EntitiesActionTypes.REMOVE,
    id
});
export const clearAllEntityDispatchAction = (
): IClearAllEntityAction => ({
    type: EntitiesActionTypes.CLEAR_ALL
});

/** Saga Actions **/
export const addEntityDispatchActionSuccess = <TEntityData>(
    id: string,
    entityEnum: EntityEnum,
    entityData: TEntityData
): IAddEntityActionSuccess<TEntityData> => ({
    type: EntitiesActionTypes.ADD_SUCCESS,
    id,
    entityEnum,
    entityData
});
export const updateEntityDispatchActionSuccess = <TEntityData>(
    id: string,
    entityData: TEntityData
): IUpdateEntityActionSuccess<TEntityData> => ({
    type: EntitiesActionTypes.UPDATE_SUCCESS,
    id,
    entityData
});
export const removeEntityDispatchActionSuccess = (
    id: string
): IRemoveEntityActionSuccess => ({
    type: EntitiesActionTypes.REMOVE_SUCCESS,
    id
});
export const clearAllEntityDispatchActionSuccess = (
): IClearAllEntityActionSuccess => ({
    type: EntitiesActionTypes.CLEAR_ALL_SUCCESS
});

