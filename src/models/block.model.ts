import { BlockAttributes } from "./block-attributes.model";

export default interface Block {
    id: number;
    type: string;
    attributes: BlockAttributes
}