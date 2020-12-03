
import {ComponentsActionTypes} from "./types";
import {
    IAddComponentAction, IAddComponentActionSuccess,
    IAddEntityComponentAction,
    IAddEntityComponentActionSuccess,
    IRemoveEntityComponentAction,
    IRemoveEntityComponentActionSuccess
} from "./actions";
import {ComponentEnum} from "../../game/components/component/component.enum";

/** Actions **/
export const addComponentDispatchAction = (
    componentEnum: ComponentEnum
): IAddComponentAction => ({
    type: ComponentsActionTypes.ADD,
    componentEnum
});
export const addEntityComponentDispatchAction = <TComponentData>(
    componentEnum: ComponentEnum,
    entityId: string,
    componentData?: TComponentData
): IAddEntityComponentAction<TComponentData> => ({
    type: ComponentsActionTypes.ADD_ENTITY,
    componentEnum,
    entityId,
    componentData
});
export const removeEntityComponentDispatchAction = (
    componentEnum: ComponentEnum,
    entityId: string
): IRemoveEntityComponentAction => ({
    type: ComponentsActionTypes.REMOVE_ENTITY,
    componentEnum,
    entityId
});

/** Saga Actions **/
export const addComponentDispatchActionSuccess = (
    componentEnum: ComponentEnum
): IAddComponentActionSuccess => ({
    type: ComponentsActionTypes.ADD_SUCCESS,
    componentEnum
});
export const addEntityComponentDispatchActionSuccess = (
    componentEnum: ComponentEnum,
    entityId: string
): IAddEntityComponentActionSuccess => ({
    type: ComponentsActionTypes.ADD_ENTITY_SUCCESS,
    componentEnum,
    entityId
});
export const removeEntityComponentDispatchActionSuccess = (
    componentEnum: ComponentEnum,
    entityId: string
): IRemoveEntityComponentActionSuccess => ({
    type: ComponentsActionTypes.REMOVE_ENTITY_SUCCESS,
    componentEnum,
    entityId
});
