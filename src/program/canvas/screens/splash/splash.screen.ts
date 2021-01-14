import * as PIXI from 'pixi.js';
import {ScreenAbstract} from "../screen/screen.abstract";
import {BackgroundGUI} from "../../gui/background/background.gui";
import {ScreenEnum} from "../screen/screen.enum";
import {Program} from "../../../program";
import {TextureEnum} from "../../textures/texture/texture.enum";
import {VERSION} from "../../../constants.env";

export class SplashScreen extends ScreenAbstract {

    constructor() {
        super(ScreenEnum.SPLASH);
        this.addChild(new BackgroundGUI({ color: 0x111111 }));

        const poweredText = new PIXI.Text('powered by', new PIXI.TextStyle({
            fontSize: 8,
            fill: '#9bbc0f'
        }));
        poweredText.position.set(-20, -15);

        const versionText = new PIXI.Text(`v${VERSION}`, new PIXI.TextStyle({
            fontSize: 6,
            fill: '#9bbc0f'
        }));
        versionText.position.set(8, 15);

        const logo = new PIXI.Sprite(Program.getInstance().canvas.textures.get(TextureEnum.LOGO));
        logo.pivot.x = logo.texture.orig.width / 2;

        this.addChild(poweredText, logo, versionText)
    }

    protected onRemoved() {
        super.onRemoved();
        Program.getInstance().canvas.cursor.visible = true;
    }

    protected update(delta: number) {
    }

}
