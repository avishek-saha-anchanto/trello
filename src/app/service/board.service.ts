import { Injectable } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  board: Board = new Board('Test Board', [
    new List('To do', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep',
    ]),
    new List('In progress', ['Finishing project']),
    new List('Done', ['Created a recipe app', 'Angular Course']),
  ]);

  getBoard() {
    return this.board;
  }
  editCardName(index: number, newName: string, listName: string) {
    let listIndex = this.board.lists.findIndex((list) => list.name === listName);
    let list = this.board.lists[listIndex];
    list.tasks[index] = newName;
  }
}