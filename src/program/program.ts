
import {Game} from "./game/game";
import {applyMiddleware, createStore, Store} from "redux";
import {Actions, DefaultState, rootReducer, rootSaga} from "./store/store.definitions";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import {Canvas} from "./canvas";
import {DATA} from "./constants.env";

export class Program {

    private static Instance: Program;
    public static getInstance (): Program {
        Program.Instance = Program.Instance || new Program();
        return Program.Instance;
    }

    public readonly canvas: Canvas;
    public readonly store: Store<DefaultState, Actions>;
    public readonly game: Game;

    private constructor() {
        console.log(`[dark-engine] started '${DATA.environment}'`);

        console.log('[dark-engine] canvas');
        this.canvas = new Canvas();

        console.log('[dark-engine] store');
        const sagaMiddleware = createSagaMiddleware();
        this.store = createStore<DefaultState, Actions, any, any>(
            rootReducer,
            applyMiddleware(thunk, sagaMiddleware)
        );
        sagaMiddleware.run(rootSaga);

        console.log('[dark-engine] game');
        this.game = new Game(this.store);
    }


}
