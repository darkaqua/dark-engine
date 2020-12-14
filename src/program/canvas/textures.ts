import * as PIXI from "pixi.js";
import {Events} from "../events/events";
import {EventEnum} from "../events/event/event.enum";

type TextureMap = {
    [id in string]: PIXI.Texture
};

export class Textures {

    private textureMap: TextureMap;
    public isLoad: boolean;

    constructor() {
        this.textureMap = {};
        Events.on(EventEnum.UPDATE, this.update);

        PIXI.utils.clearTextureCache();

        // individual texture list
        this.addTexture('logo');

        // sprite sheet list
        this.addSpriteSheet('entities');
    }

    update = (delta: number) => {
        if(this.isLoad) return;
        const isLoad = !Object.values(this.textureMap).some(texture => !texture.valid);

        if(!isLoad) return;
        this.isLoad = true;

        Events.emit(EventEnum.TEXTURES_LOAD);
    }

    get = (name: string): PIXI.Texture => {
        if(!this.textureMap[name])
            this.textureMap[name] = new PIXI.Texture(PIXI.Texture.WHITE.baseTexture);
        return this.textureMap[name];
    }

    private addTexture = (name: string) => {
        this._addTexture(name, this._getTexture(require(`assets/${name}.png`)))
    }

    private addSpriteSheet = (name: string) => {
        new PIXI.Spritesheet(
            this._getTexture(require(`assets/sprites/${name}/${name}.png`)),
            require(`assets/sprites/${name}/${name}.json`)
        ).parse((_spriteSheet: TextureMap) => {
            Object.entries(_spriteSheet)
                .map(([id, texture]) => this._addTexture(id, texture));
        });
    }

    private _getTexture = (pathRequire: any): PIXI.Texture => {
        return PIXI.Texture.from(pathRequire.default)
    }

    private _addTexture = (id: string, texture: PIXI.Texture) => {
        const _texture = this.get(id);
        _texture.valid = false;
        _texture.baseTexture.resolution = 16
        _texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
        _texture.baseTexture = texture.baseTexture;
        const onLoad = () => {
            _texture.frame = new PIXI.Rectangle(
                texture.frame.x,
                texture.frame.y,
                texture.frame.width,
                texture.frame.height
            );
            _texture.valid = true;
            _texture.baseTexture.emit('load');
        }
        _texture.baseTexture.on('updated', onLoad);
        _texture.baseTexture.on('loaded', onLoad);
        _texture.updateUvs();
    }

}
