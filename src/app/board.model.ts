import { List } from './list.model';

export class Board {
    constructor(public name: string, public lists: List[],public key?:string) {}
}