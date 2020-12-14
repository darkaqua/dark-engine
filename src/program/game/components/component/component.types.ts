import {PositionInterface} from "../position/position.interface";
import {TagInterface} from "../tag/tag.interface";
import {TargetDirectionInterface} from "../targetDirection/targetDirection.interface";
import {ContainerInterface} from "../container/container.interface";
import {SpriteInterface} from "../sprite/sprite.interface";
import {FollowCameraInterface} from "../followCamera/followCamera.interface";

export type ComponentTypes =
    | PositionInterface
    | TagInterface
    | TargetDirectionInterface
    | ContainerInterface
    | SpriteInterface
    | FollowCameraInterface
