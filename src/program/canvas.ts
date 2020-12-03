import * as Stats from 'stats-non-clickable-js';
import * as PIXI from 'pixi.js';
import {getDomStats} from "./utils/dev.stats";
import {DATA} from "./constants.env";
import {Program} from "./program";

export class Canvas {

    public readonly devStats: Stats[];
    public readonly app: PIXI.Application;

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

        PIXI.utils.clearTextureCache();
        this.app.ticker.add(this.loop);

        if(DATA.environment !== 'development') return;
        this.devStats = []
        this._loadDevStats();
    }

    private update = (delta: number) => {
        Program.getInstance().game.systems.update(delta);
    }

    private loop = (delta: number) => {
        if(this.devStats) this.devStats.map(stat => stat.begin());

        this.addedDelta += delta;
        let diffDelta = Math.trunc(this.addedDelta / 2);
        if(diffDelta > 0) {
            this.addedDelta -= Math.trunc(diffDelta * 2);
            this.update(diffDelta);
        }

        if(this.devStats) this.devStats.map(stat => stat.end());
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

    private _loadDevStats() {
        for (let i = 0; i < 3; i++)
            this.devStats.push(getDomStats((i)));
        this.devStats.forEach(stats => document.body.appendChild(stats.dom));
    }

}
