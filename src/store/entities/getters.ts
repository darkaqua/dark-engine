import {Factory} from "../../factory";

export const getEntitiesState = () =>
    Factory.getInstance().storeFactory.store.getState().entities;

export const getEntity = <TComponentData>(entityId: string): TComponentData =>
    JSON.parse(JSON.stringify(getEntitiesState()[entityId] as any));
