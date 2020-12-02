import {EntitiesFactory} from "./game/entities/entitiesFactory";
import {ComponentsFactory} from "./game/components/componentsFactory";
import {SystemsFactory} from "./game/systems/systemsFactory";
import {StoreFactory} from "./store/storeFactory";

export class Factory {

    private static Instance: Factory;
    public static getInstance (): Factory {
        Factory.Instance = Factory.Instance || new Factory();
        return Factory.Instance;
    }

    public readonly storeFactory: StoreFactory;

    public readonly entitiesFactory: EntitiesFactory;
    public readonly componentsFactory: ComponentsFactory;
    public readonly systemsFactory: SystemsFactory;

    private constructor() {
        this.storeFactory = new StoreFactory();

        this.entitiesFactory = new EntitiesFactory();
        this.componentsFactory = new ComponentsFactory(this.storeFactory);
        this.systemsFactory = new SystemsFactory();
    }


}
