import {GameScreen} from "../game/game.screen";
import {LoadingScreen} from "../loading/loading.screen";
import {MenuScreen} from "../menu/menu.screen";
import {SplashScreen} from "../splash/splash.screen";

export type ScreenTypes =
    | GameScreen
    | LoadingScreen
    | MenuScreen
    | SplashScreen
