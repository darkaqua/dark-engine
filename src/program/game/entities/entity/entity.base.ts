import {EntityAbstract} from "./entity.abstract";
import {BaseEntityType} from "../../../store/entities";
import {ComponentEnum} from "../../components/component/component.enum";
import {ComponentTypes} from "../../components/component/component.types";

export class EntityBase extends EntityAbstract {

    constructor(
        baseEntityType: BaseEntityType
    ) {
        super(
            baseEntityType.entityEnum,
            baseEntityType.entityId
        );

        Object.keys(baseEntityType)
            .filter(key => ComponentEnum[key])
            .map((componentEnum: ComponentEnum) =>
                this.addComponent(componentEnum, { [componentEnum]: baseEntityType[componentEnum] } as ComponentTypes));
    }
}
