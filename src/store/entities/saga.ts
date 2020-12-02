import {all, put, takeEvery} from "@redux-saga/core/effects";
import {EntitiesActions, EntitiesActionTypes} from "./types";
import {IAddEntityAction, IRemoveEntityAction, IUpdateEntityAction} from "./actions";
import {
    addEntityDispatchActionSuccess, removeEntityDispatchActionSuccess,
    updateEntityDispatchActionSuccess
} from "./dispatchers";

/** Initial saga **/
export function* entitiesSaga() {
    yield all([
        takeEvery(EntitiesActionTypes.ADD, add),
        takeEvery(EntitiesActionTypes.UPDATE, update),
        takeEvery(EntitiesActionTypes.REMOVE, remove),
    ]);
}

/** Saga functions **/
//
function* add(action: IAddEntityAction<any>) {
    yield put<EntitiesActions>(addEntityDispatchActionSuccess(action.id, action.entityData));
}

function* update(action: IUpdateEntityAction<any>) {
    yield put<EntitiesActions>(updateEntityDispatchActionSuccess(action.id, action.entityData));
}

function* remove(action: IRemoveEntityAction) {
    yield put<EntitiesActions>(removeEntityDispatchActionSuccess(action.id));
}
