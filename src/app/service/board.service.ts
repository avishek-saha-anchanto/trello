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

//     constructor() {
//         const boardJSON = JSON.stringify(this.board);
//         localStorage.setItem('board', boardJSON);

//     const storedBoard = localStorage.getItem('board');
//     if (storedBoard) {
//       // Parse the stored board JSON string and assign it to the board property
//       this.board = JSON.parse(storedBoard);
//     } else {
//       // If no board is found in local storage, initialize a new board
//       this.board = new Board('Default Board', []);
//     }
  
//   }
  getBoard() {
    return this.board;
  }
}
