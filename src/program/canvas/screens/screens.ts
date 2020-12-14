import {ScreenTypesMap} from "./screen/screen.types.map";
import {ScreenEnum} from "./screen/screen.enum";
import {GameScreen} from "./game/game.screen";
import {LoadingScreen} from "./loading/loading.screen";
import {MenuScreen} from "./menu/menu.screen";
import {SplashScreen} from "./splash/splash.screen";

export const getScreens = (): ScreenTypesMap => ({
    [ScreenEnum.GAME]: new GameScreen(),
    [ScreenEnum.LOADING]: new LoadingScreen(),
    [ScreenEnum.MENU]: new MenuScreen(),
    [ScreenEnum.SPLASH]: new SplashScreen()
});
