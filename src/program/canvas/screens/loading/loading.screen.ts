import * as PIXI from 'pixi.js';
import {ScreenAbstract} from "../screen/screen.abstract";
import {BackgroundGUI} from "../../gui/background/background.gui";
import {ScreenEnum} from "../screen/screen.enum";

export class LoadingScreen extends ScreenAbstract {

    private readonly textGUI: PIXI.Text;
    private deltaAdded: number;

    constructor() {
        super(ScreenEnum.LOADING);
        this.deltaAdded = 0;

        this.addChild(new BackgroundGUI({ color: 0x111111 }));
        this.textGUI = new PIXI.Text('loading...', new PIXI.TextStyle({
            fontSize: 8,
            fill: '#9bbc0f'
        }));
        this.addChild(this.textGUI);
    }

    protected update(delta: number) {
        this.deltaAdded += delta;

        if(10 > this.deltaAdded) return;
        this.deltaAdded = 0;

        switch (this.textGUI.text) {
            case 'loading...':
                return this.textGUI.text = 'loading'
            case 'loading..':
                return this.textGUI.text = 'loading...'
            case 'loading.':
                return this.textGUI.text = 'loading..'
            case 'loading':
                return this.textGUI.text = 'loading.'
        }
    }

}
