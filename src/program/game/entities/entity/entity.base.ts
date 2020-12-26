import {EntityAbstract} from "./entity.abstract";
import {BaseEntityType} from "../../../store/entities";

export class EntityBase extends EntityAbstract {

    private static EXCLUDED_KEYS_TO_ADD = ['_id', 'entityEnum', 'entityId'];

    constructor(
        baseEntityType: BaseEntityType
    ) {
        super(
            baseEntityType.entityEnum,
            baseEntityType.entityId,
            Object.keys(baseEntityType)
                .filter(key => !EntityBase.EXCLUDED_KEYS_TO_ADD.includes(key))
                .reduce((a, b, c) => ({
                    ...a,
                    [b]: baseEntityType[b]
                }), {})
        );
    }
}
