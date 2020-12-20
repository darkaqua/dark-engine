import {all, put, takeEvery} from "@redux-saga/core/effects";
import {EntitiesActions, EntitiesActionTypes} from "./types";
import {IAddEntityAction, IRemoveEntityAction, IUpdateEntityAction} from "./actions";
import {
    addEntityDispatchActionSuccess, removeEntityDispatchActionSuccess,
    updateEntityDispatchActionSuccess
} from "./dispatchers";
import {ComponentEnum} from "../../game/components/component/component.enum";
import {Program} from "../../program";

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
    yield put<EntitiesActions>(addEntityDispatchActionSuccess(action.id, action.entityEnum, action.entityData));
}

function* update(action: IUpdateEntityAction<any>) {
    Program.getInstance().game.systems
        .getSystemsByComponents(Object.keys(action.entityData) as ComponentEnum[])
        .map(system => system.onEntityDataUpdate(action.id, action.entityData));

    yield put<EntitiesActions>(updateEntityDispatchActionSuccess(action.id, action.entityData));
}

function* remove(action: IRemoveEntityAction) {
    yield put<EntitiesActions>(removeEntityDispatchActionSuccess(action.id));
}
