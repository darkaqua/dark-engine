import {ComponentEnum} from "../../game/components/component/component.enum";
import {ComponentInterface} from "../../game/components/component/component.interface";
import {Program} from "../../program";

export const getComponentsState = () =>
    Program.getInstance().store.getState().components;

export const getComponentState = (componentEnum: ComponentEnum): ComponentInterface =>
    getComponentsState()[componentEnum];

export const getComponentEntities = (componentEnum: ComponentEnum): string[] =>
    getComponentState(componentEnum).entities;
