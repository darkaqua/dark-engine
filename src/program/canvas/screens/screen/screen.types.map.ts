import {ScreenEnum} from "./screen.enum";
import {ScreenTypes} from "./screen.types";

export type ScreenTypesMap = {
    [id in ScreenEnum]: ScreenTypes
}