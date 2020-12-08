import {ComponentEnum} from "./component.enum";
import {PositionInterface} from "../position/position.interface";
import {TagInterface} from "../tag/tag.interface";
import {TargetDirectionInterface} from "../targetDirection/targetDirection.interface";
import {ContainerInterface} from "../container/container.interface";

// TODO: Can we check that all enum items are updated here? Otherwise this map needs to be updated manually
export type ComponentTypeInterfaceMap = {
    [ComponentEnum.POSITION]: PositionInterface,
    [ComponentEnum.TAG]: TagInterface,
    [ComponentEnum.TARGET_DIRECTION]: TargetDirectionInterface,
    [ComponentEnum.CONTAINER]: ContainerInterface
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