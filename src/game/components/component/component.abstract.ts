
import {ComponentEnum} from "./component.enum";

export abstract class ComponentAbstract<TComponentData> {

    public readonly id: ComponentEnum;
    public readonly defaultData: TComponentData;

    protected constructor(
        componentEnum: ComponentEnum,
        defaultData: TComponentData
    ) {
        this.id = componentEnum;
        this.defaultData = defaultData;
    }

}
