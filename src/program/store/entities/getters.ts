import {Program} from "../../program";

export const getEntitiesState = () =>
    Program.getInstance().store.getState().entities;

export const getEntity = <TComponentData>(entityId: string): TComponentData =>
    JSON.parse(JSON.stringify(getEntitiesState()[entityId] as any));
