import * as PIXI from 'pixi.js';
import {ScreenAbstract} from "../screen/screen.abstract";
import {EventEnum} from "../../../events/event/event.enum";
import {Program} from "../../../program";
import {KeyboardDataType} from "../../../events/callback/keyboard/keyboard.data.type";
import {ScreenEnum} from "../screen/screen.enum";
import {Sandbox} from "../../sandbox";

export class GameScreen extends ScreenAbstract {

    constructor() {
        super(ScreenEnum.GAME);

        const text = new PIXI.Text('I\'m a fixed GUI', new PIXI.TextStyle({
            fontSize: 8,
            fill: '#9bbc0f'
        }));
        text.position.set(0, 40);
        this.addChild(text);

        this.eventManager.subscribeEvent(EventEnum.KEYBOARD_KEY, this.onKeyboardKey.bind(this));
    }

    protected onAdded() {
        super.onAdded();
        Sandbox.load();
    }

    protected update(delta: number) {
    }

    private onKeyboardKey(key: KeyboardDataType) {
        if(!this.visible) return;

        const { canvas } = Program.getInstance();
        const { camera } = canvas;

        switch (key.keyboardEvent.key) {
            case 'ArrowRight':
                camera.move({ x: -30, y: 0 });
                break;
            case 'ArrowLeft':
                camera.move({ x: 30, y: 0 });
                break;
            case 'ArrowUp':
                camera.move({ x: 0, y: 30 });
                break;
            case 'ArrowDown':
                camera.move({ x: 0, y: -30 });
                break;
            case '+':
                if(!key.isDown) return;
                camera.scale++;
                break;
            case '-':
                if(!key.isDown) return;
                camera.scale--;
                break;
        }
    }

}
