import {all, put, takeEvery} from "@redux-saga/core/effects";
import {ComponentsActions, ComponentsActionTypes} from "./types";
import {IAddComponentAction, IAddEntityComponentAction} from "./actions";
import {
    addComponentDispatchActionSuccess,
    addEntityComponentDispatchActionSuccess,
    removeEntityComponentDispatchActionSuccess,
} from "./dispatchers";
import {EntitiesActions} from "../entities";
import {updateEntityDispatchAction} from "../entities/dispatchers";
import {Program} from "../../program";

/** Initial saga **/
export function* componentsSaga() {
    yield all([
        takeEvery(ComponentsActionTypes.ADD, add),
        takeEvery(ComponentsActionTypes.ADD_ENTITY, addEntity),
        takeEvery(ComponentsActionTypes.REMOVE_ENTITY, removeEntity),
    ]);
}

/** Saga functions **/
//
function* add(action: IAddComponentAction) {
    yield put<ComponentsActions>(addComponentDispatchActionSuccess(action.componentEnum));
}
function* addEntity(action: IAddEntityComponentAction<any>) {
    const { defaultData } = Program.getInstance().game.components.get(action.componentEnum);
    const entityData = {
        [action.componentEnum]: {
            ...defaultData[action.componentEnum],
            ...action.componentData[action.componentEnum]
        }
    }
    yield put<EntitiesActions>(updateEntityDispatchAction(action.entityId, entityData))
    yield put<ComponentsActions>(addEntityComponentDispatchActionSuccess(action.componentEnum, action.entityId));
}

function* removeEntity(action: IAddEntityComponentAction<any>) {
    yield put<ComponentsActions>(removeEntityComponentDispatchActionSuccess(action.componentEnum, action.entityId));
}
