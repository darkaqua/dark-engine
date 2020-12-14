import {ScreenAbstract} from "../screen/screen.abstract";
import {ScreenEnum} from "../screen/screen.enum";
import {BackgroundGUI} from "../../gui/background/background.gui";
import * as PIXI from "pixi.js";
import {Program} from "../../../program";

export class MenuScreen extends ScreenAbstract {

    constructor() {
        super(ScreenEnum.MENU);
        this.addChild(new BackgroundGUI({ color: 0x111111 }));

        const menuText = new PIXI.Text('Menu', new PIXI.TextStyle({
            fontSize: 8,
            fill: '#9bbc0f'
        }));
        menuText.position.set(-5, -35);


        const playText = new PIXI.Text('PLAY THE GAME', new PIXI.TextStyle({
            fontSize: 8,
            fill: '#9bbc0f'
        }));
        playText.interactive = true;
        playText.position.set(-25, 0);
        playText.on('mouseover', () => {
            playText.style.fill = '#306230';
            playText.updateText(true);
        });
        playText.on('mouseout', () => {
            playText.style.fill = '#9bbc0f';
            playText.updateText(true);
        });
        playText.on('pointerdown', () => {
            const { canvas } = Program.getInstance();

            canvas.setScreen(ScreenEnum.LOADING);
            setTimeout(() => {
                canvas.setScreen(ScreenEnum.GAME);
            }, 5000);
        });

        this.addChild(menuText, playText);
    }

    protected update(delta: number) {
    }

}
