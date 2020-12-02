import {ComponentsActionTypes} from "./types";
import {ComponentEnum} from "../../game/components/component/component.enum";


/** Saga Actions **/
export interface IAddComponentAction {
    type: typeof ComponentsActionTypes.ADD;
    componentEnum: ComponentEnum;
}
export interface IAddEntityComponentAction<TComponentData> {
    type: typeof ComponentsActionTypes.ADD_ENTITY;
    componentEnum: ComponentEnum;
    entityId: string;
    componentData: TComponentData;
}
export interface IRemoveEntityComponentAction {
    type: typeof ComponentsActionTypes.REMOVE_ENTITY;
    componentEnum: ComponentEnum;
    entityId: string;
}

/** Actions **/
export interface IAddComponentActionSuccess {
    type: typeof ComponentsActionTypes.ADD_SUCCESS;
    componentEnum: ComponentEnum;
}
export interface IAddEntityComponentActionSuccess {
    type: typeof ComponentsActionTypes.ADD_ENTITY_SUCCESS;
    componentEnum: ComponentEnum;
    entityId: string;
}
export interface IRemoveEntityComponentActionSuccess {
    type: typeof ComponentsActionTypes.REMOVE_ENTITY_SUCCESS;
    componentEnum: ComponentEnum;
    entityId: string;
}

