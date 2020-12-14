import {ComponentEnum} from "./component.enum";
import {PositionInterface} from "../position/position.interface";
import {TagInterface} from "../tag/tag.interface";
import {TargetDirectionInterface} from "../targetDirection/targetDirection.interface";
import {ContainerInterface} from "../container/container.interface";
import {SpriteInterface} from "../sprite/sprite.interface";
import {FollowCameraInterface} from "../followCamera/followCamera.interface";

// TODO: Can we check that all enum items are updated here? Otherwise this map needs to be updated manually
export type ComponentTypeInterfaceMap = {
    [ComponentEnum.TAG]: TagInterface,
    [ComponentEnum.CONTAINER]: ContainerInterface,
    [ComponentEnum.SPRITE]: SpriteInterface,
    [ComponentEnum.TARGET_DIRECTION]: TargetDirectionInterface,
    [ComponentEnum.POSITION]: PositionInterface,
    [ComponentEnum.FOLLOW_CAMERA]: FollowCameraInterface,
}

// Overload function declaration => https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

// We declare a Overload for each enum using the InterfaceMap
export type AddComponentInterface =
    UnionToIntersection<ComponentEnum extends infer T
        ? (T extends ComponentEnum
            ? (type: T, data: ComponentTypeInterfaceMap[T]) => void
            : never)
        : never>