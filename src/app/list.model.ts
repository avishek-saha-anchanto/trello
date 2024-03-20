import { Card } from "./card.model";

export class List {
    constructor(public name: string, public tasks: Card[]) {}
}