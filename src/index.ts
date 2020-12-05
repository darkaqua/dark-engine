import {Program} from "./program/program";
import {Player} from "./program/game/entities/player/player";
import {TargetDirectionEnum} from "./program/game/components/targetDirection/targetDirection.enum";

const { game } = Program.getInstance();

game.entities.addEntity(new Player('pagoru', { x: 0, y: 0 }, TargetDirectionEnum.BOTTOM));
game.entities.addEntity(new Player('Steve from Minecraft', { x: 0, y: 50 }, TargetDirectionEnum.NONE));
