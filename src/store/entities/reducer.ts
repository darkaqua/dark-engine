import {Reducer} from 'redux'
import {produce} from 'immer'
import {EntitiesState, EntitiesActionTypes, EntitiesActions, entitiesDefaultState} from "./types";

export const entitiesReducer: Reducer<EntitiesState, EntitiesActions> = (
    state = entitiesDefaultState(),
    action: EntitiesActions
) => {
    switch (action.type) {
        case EntitiesActionTypes.ADD_SUCCESS:
            return produce(state, (copyState: EntitiesState) => {
                copyState[action.id] = action.entityData;
            });
        case EntitiesActionTypes.UPDATE_SUCCESS:
            return produce(state, (copyState: EntitiesState) => {
                copyState[action.id] = {
                    ...copyState[action.id],
                    ...action.entityData
                };
            });
        case EntitiesActionTypes.REMOVE_SUCCESS:
            return produce(state, (copyState: EntitiesState) => {
                delete copyState[action.id];
            });
    }
    return state
}
