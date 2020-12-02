import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore, Store} from "redux";
import {Actions, DefaultState, rootReducer, rootSaga} from "./store.definitions";
import thunk from "redux-thunk";

export class StoreFactory {

    public readonly store: Store<DefaultState, Actions>;

    constructor(defaultState: DefaultState = {} as any) {
        /** Saga init **/
        const sagaMiddleware = createSagaMiddleware();

        /** Store creation **/
        this.store = createStore<DefaultState, Actions, any, any>(
            rootReducer,
            defaultState,
            applyMiddleware(thunk, sagaMiddleware)
        );
        sagaMiddleware.run(rootSaga);
    }


}
