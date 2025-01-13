import { HANDLER_IDS } from "../constants/handlerIds.js";
import initialHandler from "./user/initial.handler.js";

// 0 : Init
// 2 : LocationUpdate
const handlers = {
    [HANDLER_IDS.INITIAL]:{
        handler: initialHandler,
        protoType: 'initial.InitialPacket',
    }
};

export const getHandlerById = (handlerId) => {
    if (!handlers[handlerId]) {
        console.error(`Handler with ID ${handlerId} not found.`)
    }
    return handlers[handlerId].handler;
}

export const getProtoTypeNameByHandlerId = (handlerId) => {
    if(!handlers[handlerId]){
        console.error(`Handler with ID ${handlerId} not found.`)
    }
    return handlers[handlerId].protoType;
}

export default handlers;