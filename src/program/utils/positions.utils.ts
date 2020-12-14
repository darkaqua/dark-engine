import * as PIXI from 'pixi.js';

export const isPositionInsideContainer = (
    position: PIXI.IPointData,
    spritePosition: PIXI.IPointData,
    size: PIXI.ISize
): boolean => (
    position.x >= spritePosition.x
    && position.y >= spritePosition.y
    && position.x < spritePosition.x + size.width
    && position.y < spritePosition.y + size.height
)
