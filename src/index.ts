import {Factory} from "./factory";
import {Player} from "./game/entities/player/player";
import {TargetDirectionEnum} from "./game/components/targetDirection/targetDirection.enum";

const factory = Factory.getInstance();
factory.entitiesFactory.addEntity(new Player('pagoru', { x: 0, y: 10 }, TargetDirectionEnum.BOTTOM));
factory.entitiesFactory.addEntity(new Player('Steve', { x: 0, y: 0 }, TargetDirectionEnum.NONE));

setInterval(() => {
    console.log('-----------------------------' + Date.now() + '-----------------------------');
    factory.systemsFactory.update(Math.trunc(Math.random() * 1000));
}, 1000);
