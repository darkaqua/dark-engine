import {Reducer} from 'redux'
import {produce} from 'immer'
import {ComponentsState, ComponentsActionTypes, ComponentsActions, componentsDefaultState} from "./types";

export const componentsReducer: Reducer<ComponentsState, ComponentsActions> = (
    state = componentsDefaultState(),
    action: ComponentsActions
) => {
    switch (action.type) {
        case ComponentsActionTypes.ADD_SUCCESS:
            return produce(state, (copyState: ComponentsState) => {
                copyState[action.componentEnum] = {
                    entities: []
                }
            });
        case ComponentsActionTypes.ADD_ENTITY_SUCCESS:
            return produce(state, (copyState: ComponentsState) => {
                copyState[action.componentEnum].entities.push(action.entityId)
            });
        case ComponentsActionTypes.REMOVE_ENTITY_SUCCESS:
            return produce(state, (copyState: ComponentsState) => {
                copyState[action.componentEnum].entities = copyState[action.componentEnum].entities
                    .filter(entityId => entityId !== action.entityId);
            });
    }
    return state
}
