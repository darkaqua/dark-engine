
import {FollowCameraInterface} from "./followCamera.interface";
import {ComponentEnum} from "../component/component.enum";
import {ComponentAbstract} from "../component/component.abstract";

export class FollowCamera extends ComponentAbstract<FollowCameraInterface> {

    constructor() {
        super(
            ComponentEnum.FOLLOW_CAMERA,
            {
                [ComponentEnum.FOLLOW_CAMERA]: {
                    follow: true
                }
            }
        );
    }

}
