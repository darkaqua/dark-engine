import {PositionInterface} from "../position/position.interface";
import {TagInterface} from "../tag/tag.interface";
import {TargetDirectionInterface} from "../targetDirection/targetDirection.interface";
import {ContainerInterface} from "../container/container.interface";

export type ComponentTypes =
    | PositionInterface
    | TagInterface
    | TargetDirectionInterface
    | ContainerInterface
