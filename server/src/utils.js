import { PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "./constants/header.js";

// read header from buffer
export const readHeader = (buffer) => {
    return {
        length: buffer.readUInt32BE(0),
        handlerId: buffer.readUInt16BE(TOTAL_LENGTH),
    };
}

// write header to buffer
export const writeHeader = (length, handlerId) => {
    const headerSize = TOTAL_LENGTH + PACKET_TYPE_LENGTH;
    const buffer = Buffer.alloc(headerSize);
    buffer.writeUInt32BE(length + headerSize, 0);
    buffer.writeUInt16BE(handlerId, TOTAL_LENGTH);
    return buffer;
}