
import {ContainerInterface} from "./container.interface";
import {ComponentEnum} from "../component/component.enum";
import {ComponentAbstract} from "../component/component.abstract";

export class Container extends ComponentAbstract<ContainerInterface> {

    constructor() {
        super(
            ComponentEnum.CONTAINER,
            {
                [ComponentEnum.CONTAINER]: {
                    visible: true
                }
            }
        );
    }

}
