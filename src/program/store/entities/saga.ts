import {all, put, takeEvery, takeLatest, takeLeading} from "@redux-saga/core/effects";
import {EntitiesActions, EntitiesActionTypes} from "./types";
import {IAddEntityAction, IRemoveEntityAction, IUpdateEntityAction} from "./actions";
import {
    addEntityDispatchActionSuccess, clearAllEntityDispatchActionSuccess, removeEntityDispatchActionSuccess,
    updateEntityDispatchActionSuccess
} from "./dispatchers";
import {ComponentEnum} from "../../game/components/component/component.enum";
import {Program} from "../../program";
import {addEntityComponentDispatchAction, clearAllEntityComponentDispatchAction} from "../components/dispatchers";
import {ComponentsActions} from "../components";

/** Initial saga **/
export function* entitiesSaga() {
    yield all([
        takeEvery(EntitiesActionTypes.ADD, add),
        takeLatest(EntitiesActionTypes.UPDATE, update),
        takeEvery(EntitiesActionTypes.REMOVE, remove),
        takeLeading(EntitiesActionTypes.CLEAR_ALL, clearAll),
    ]);
}

/** Saga functions **/
//
function* add(action: IAddEntityAction<any>) {
    yield put<EntitiesActions>(addEntityDispatchActionSuccess(action.id, action.entityEnum, action.entityData));

    yield Object.keys(action.entityData).map((componentEnum: ComponentEnum) =>
        put<ComponentsActions>(addEntityComponentDispatchAction(componentEnum, action.id, action.entityData[componentEnum]))
    );
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

function* clearAll() {
    yield put<ComponentsActions>(clearAllEntityComponentDispatchAction());
    yield put<EntitiesActions>(clearAllEntityDispatchActionSuccess());

    Program.getInstance().game.systems.stopAll();
}
