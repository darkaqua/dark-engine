import * as Stats from 'stats-non-clickable-js';
import * as PIXI from 'pixi.js';
import {getDomStats} from "../utils/dev.stats";
import {DATA} from "../constants.env";
import {Program} from "../program";
import {Cursor} from "./cursor";
import {Camera} from "./camera";
import {ScreenEnum} from "./screens/screen/screen.enum";
import {Textures} from "./textures";
import {Events} from "../events/events";
import {EventEnum} from "../events/event/event.enum";
import {getScreens} from "./screens/screens";
import {ScreenTypesMap} from "./screens/screen/screen.types.map";

export class Canvas {

    public readonly devStats: Stats[];
    public readonly app: PIXI.Application;
    public readonly camera: Camera;
    public readonly cursor: Cursor;

    private _screens: ScreenTypesMap;
    private _selectedScreen: ScreenEnum;

    public readonly textures: Textures;

    private addedDelta = 0;

    constructor() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x333333,
            antialias: true,
            resolution: window.devicePixelRatio,
            autoDensity: true,
        });

        this.stage.sortableChildren = true;
        this.stage.interactive = true;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.view);

        this.textures = new Textures();

        PIXI.utils.clearTextureCache();
        this.app.ticker.speed = 0.5;
        this.app.ticker.add(this.loop);
        Events.on(EventEnum.FOCUS_IN, this.onFocusIn);

        this.camera = new Camera();

        if(!PIXI.utils.isMobile.any) {
            this.cursor = new Cursor();
            this.stage.addChild(this.cursor)
        }

        Events.on(EventEnum.TEXTURES_LOAD, this.load);

        if(DATA.environment !== 'development') return;
        this.devStats = []
        this._loadDevStats();
    }

    private load = () => {
        this._screens = getScreens();

        this.setScreen(ScreenEnum.SPLASH);
        Events.emit(EventEnum.LOAD);
        setTimeout(() => {
            this.setScreen(ScreenEnum.MENU);
        }, 5000);
    }

    private loop = (delta: number) => {
        if(this.devStats) this.devStats.map(stat => stat.begin());

        this.addedDelta += delta;
        const truncateDelta = Math.trunc(this.addedDelta);
        if(truncateDelta > 0) {
            this.addedDelta -= truncateDelta;
            Events.emit(EventEnum.UPDATE, truncateDelta);
        }
        if(this.devStats) this.devStats.map(stat => stat.end());
    }

    private onFocusIn = (data: any) => {
        const { deltaMS, speed } = this.app.ticker;
        // Adds elapsed time between focus in and focus out
        const deltaCorrection = data.elapsedTime / (deltaMS / speed);
        this.addedDelta += deltaCorrection;
    }

    public get view(): HTMLCanvasElement {
        return this.app.view;
    }

    public get stage(): PIXI.Container {
        return this.app.stage;
    }

    public get renderer(): PIXI.Renderer {
        return this.app.renderer;
    }

    public getSize(): PIXI.ISize {
        const { window, canvas } = Program.getInstance()
        const { width, height } = window;
        const { scale } = canvas.camera;
        return {
            width: width / scale,
            height: height / scale
        };
    }

    public setScreen(screenEnum: ScreenEnum) {
        // this.getSelectedScreen().hide();
        if(this._selectedScreen)
            this.stage.removeChild(this.getSelectedScreen());
        this._selectedScreen = screenEnum;
        this.stage.addChild(this.getSelectedScreen());
        // this.getSelectedScreen().show();
    }

    public getScreen(screenEnum: ScreenEnum) {
        return this._screens[screenEnum];
    }

    public getSelectedScreen() {
        return this.getScreen(this.getSelectedScreenEnum());
    }

    public getSelectedScreenEnum() {
        return this._selectedScreen
    }

    private _loadDevStats() {
        for (let i = 0; i < 3; i++)
            this.devStats.push(getDomStats((i)));
        this.devStats.forEach(stats => document.body.appendChild(stats.dom));
    }

}
