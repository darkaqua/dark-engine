import {Program} from "../../../program";
import {EventEnum} from "../../../events/event/event.enum";
import {ScreenEnum} from "./screen.enum";
import {ContainerAbstract} from "../../abstract/container.abstract";

export abstract class ScreenAbstract extends ContainerAbstract {

    protected constructor(
        screenEnum: ScreenEnum
    ) {
        super();
        this.name = screenEnum;
        this.zIndex = Number.MAX_SAFE_INTEGER - 1;

        this.eventManager.subscribeEvent(EventEnum.CAMERA_UPDATE, this.onCameraUpdate.bind(this));
        this.eventManager.subscribeEvent(EventEnum.UPDATE, this.update.bind(this))
    }

    protected onAdded() {
        super.onAdded();
        console.log('screen camera?')
        Program.getInstance().canvas.camera.set({ x: 0, y: 0 });
    }

    protected abstract update(delta: number);

    protected onCameraUpdate = () => {
        const { position } = Program.getInstance().canvas.camera;
        this.position.set(- position.x, - position.y);
    }


}
