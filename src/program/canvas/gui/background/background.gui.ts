import * as PIXI from 'pixi.js';
import {BackgroundGUIConfig, defaultBackgroundGUIConfig} from "./background.gui.config";
import {Program} from "../../../program";
import {BaseGUIAbstract} from "../base/base.gui.abstract";

export class BackgroundGUI extends BaseGUIAbstract<BackgroundGUIConfig> {

    constructor(
        config: BackgroundGUIConfig = defaultBackgroundGUIConfig()
    ) {
        super(config, PIXI.Texture.WHITE);

        this.config = defaultBackgroundGUIConfig(config);
    }

    protected onRefresh() {
        const { canvas } = Program.getInstance();
        const size = canvas.getSize();

        this.tint = this.config.color;

        this.width = size.width;
        this.height = size.height;

        this.pivot.x = Math.trunc(this.texture._frame.width / 2);
        this.pivot.y = Math.trunc(this.texture._frame.height / 2);

        super.onRefresh();
    }
}
