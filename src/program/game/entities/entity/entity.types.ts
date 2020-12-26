import {Player} from "../player/player";
import {BadGuy} from "../badGuy/badGuy";
import {EntityBase} from "./entity.base";

export type EntityTypes =
    | EntityBase
    | Player
    | BadGuy
