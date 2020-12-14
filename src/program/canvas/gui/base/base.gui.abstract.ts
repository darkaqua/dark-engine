import * as PIXI from 'pixi.js';
import {EventEnum} from "../../../events/event/event.enum";
import {v4} from "uuid";
import {BaseGUIAbstractConfig, defaultBaseGUIAbstractConfig} from "./base.gui.abstract.config";
import {SpriteAbstract} from "../../abstract/sprite.abstract";

export abstract class BaseGUIAbstract<TConfig extends BaseGUIAbstractConfig> extends SpriteAbstract {

    private _config: TConfig;

    protected constructor(
        config: TConfig,
        texture?: PIXI.Texture
    ) {
        super(texture)
        this.name = v4();
        this._config = defaultBaseGUIAbstractConfig<TConfig>(config);

        this.eventManager.subscribeEvent(EventEnum.CAMERA_UPDATE, this.onCameraUpdate.bind(this));
        this.eventManager.subscribeEvent(EventEnum.WINDOW_RESIZE, this.onWindowResize.bind(this));
    }

    set config(config: TConfig) {
        this._config = {
            ...this._config,
            ...config
        };
        this.onRefresh();
    }

    get config(){
        return this._config;
    }

    protected onCameraUpdate() {
        this.onRefresh();
    }

    protected onWindowResize() {
        this.onRefresh();
    }

    protected onRefresh() {
        this.emit('refresh');
    }
}
