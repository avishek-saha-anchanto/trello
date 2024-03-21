import { Injectable } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { Card } from '../card.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  board: Board = new Board('Test Board', [
    new List('To do', [
      new Card('Get to work',''),
      new Card('Pick up groceries',''),
      new Card('Go home',''),
      new Card('Fall asleep',''),
    ]),
    new List('In progress', [new Card('Finishing project','')]),
    new List('Done', [new Card('Created a recipe app',''), new Card('Angular Course','')]),
  ]);

  getBoard() {
    return this.board;
  }

  addList(newList: List) {
    this.board.lists.push(newList);
    console.log(this.board.lists);
  }


  editCardName(index: number, newName: string,newDescription:string, listName: string) {
    let listIndex = this.board.lists.findIndex(
      (list) => list.name === listName
    );
    let list = this.board.lists[listIndex];
    list.tasks[index].name = newName;
    list.tasks[index].description = newDescription;
    console.log(list);
  }
  getCard(index: number, listIndex: number): Card | undefined {
    const list = this.board.lists[listIndex];
    if (list) {
      return list.tasks[index];
    } else {
      console.error(`List at index ${listIndex} not found.`);
      return undefined;
    }
  }
  addCardOnBoard(index: number, cardTitle: string) {
    this.board.lists[index].tasks.push(new Card (cardTitle,''));
    console.log(this.board.lists[index]);
  }
}
