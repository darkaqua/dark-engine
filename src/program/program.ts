
import {Game} from "./game/game";
import {applyMiddleware, createStore, Store} from "redux";
import {Actions, DefaultState, rootReducer, rootSaga} from "./store/store.definitions";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import {DATA} from "./constants.env";
import {Keyboard} from "./keyboard";
import {EventEnum} from "./events/event/event.enum";
import {Events} from "./events/events";
import {Canvas} from "./canvas/canvas";
import {Window} from "./window";

export class Program {

    private static Instance: Program;
    public static getInstance (): Program | undefined {
        return Program.Instance;
    }
    public static start() {
        Program.Instance = new Program();
        return Program.Instance;
    }

    public readonly keyboard: Keyboard;
    public readonly canvas: Canvas;
    public readonly window: Window;
    public readonly store: Store<DefaultState, Actions>;
    public readonly game: Game;

    private constructor() {
        console.log(`[dark-engine] started '${DATA.environment}'`);

        console.log('[dark-engine] window');
        this.window = new Window();

        console.log('[dark-engine] canvas');
        this.canvas = new Canvas();

        console.log('[dark-engine] keyboard');
        this.keyboard = new Keyboard();

        console.log('[dark-engine] store');
        const sagaMiddleware = createSagaMiddleware();
        this.store = createStore<DefaultState, Actions, any, any>(
            rootReducer,
            applyMiddleware(thunk, sagaMiddleware)
        );
        sagaMiddleware.run(rootSaga);

        console.log('[dark-engine] game');
        this.game = new Game(this.store);

        (() => Events.emit(EventEnum.PROGRAM_LOAD))();
    }


}
