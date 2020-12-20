import {TextureEnum} from "./texture.enum";
import * as PIXI from "pixi.js";

export type TextureMapType = {
    [id in TextureEnum]: PIXI.Texture
};
