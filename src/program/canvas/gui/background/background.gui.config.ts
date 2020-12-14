import {BaseGUIAbstractConfig} from "../base/base.gui.abstract.config";

export interface BackgroundGUIConfig extends BaseGUIAbstractConfig {
    color?: number
}

export const defaultBackgroundGUIConfig = (
    config: BackgroundGUIConfig = {}
): BackgroundGUIConfig => ({
    color: 0xFF00FF,
    ...config
})
