
export interface BaseGUIAbstractConfig {
}

export const defaultBaseGUIAbstractConfig = <TConfig extends BaseGUIAbstractConfig>(
    config: TConfig
): TConfig => ({
    ...config
})
