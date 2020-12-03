import {combineReducers} from 'redux';
import {entitiesReducer, EntitiesState, EntitiesActions, entitiesSaga} from "./entities";
import {all} from "@redux-saga/core/effects";
import {ComponentsActions, componentsReducer, componentsSaga, ComponentsState} from "./components";

/** Default State **/
export interface DefaultState {
    entities: EntitiesState,
    components: ComponentsState
}

/** root Reducers **/
export const rootReducer = combineReducers({
    entities: entitiesReducer,
    components: componentsReducer
});

export type Actions =
    | EntitiesActions
    | ComponentsActions

/** root Sagas **/
export function* rootSaga() {
    yield all([
        entitiesSaga(),
        componentsSaga()
    ]);
}
