import {ComponentAbstract} from "../component/component.abstract";
import {ComponentEnum} from "../component/component.enum";
import {TagInterface} from "./tag.interface";

export class Tag extends ComponentAbstract<TagInterface> {

    constructor() {
        super(
            ComponentEnum.TAG,
            {
                tag: {
                    username: 'username'
                }
            }
        );
    }

}
