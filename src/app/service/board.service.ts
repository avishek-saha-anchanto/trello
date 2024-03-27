import { Injectable } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { Card } from '../card.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boards: Board[] = [];
  boardsChanged = new Subject<Board[]>();
 

  setBoards(boards: Board[]) {
    this.boards = boards;
  }
  getBoards(): Board[] {
    return this.boards;
  }

  addList(newList: List, boardIndex: number) {
    console.log("addlist");
    this.boards[boardIndex].lists.push(newList);
    this.boardsChanged.next(this.boards.slice());
   // this.firebaseService.postList(this.boards[boardIndex].key,newList);
  }

  addCardToList(listIndex: number, card: Card, boardIndex: number) {
    console.log(card);
    this.boards[boardIndex].lists[listIndex].tasks.push(card);
    this.boardsChanged.next(this.boards.slice());
  }
  
  addBoard(newBoard: Board) {
    this.boards.push(newBoard);
    this.boardsChanged.next(this.boards.slice());

  }

  clearBoard() {
    this.boards = [];
  }

  getBoardById(boardIndex: number): Board {
    return this.boards[boardIndex];
  }

  editCardName(
    index: number,
    newName: string,
    listIndex: number,
    boardIndex: number,
    description: string
  ) {
    const board = this.boards[boardIndex];
    if (
      board &&
      board.lists &&
      board.lists[listIndex] &&
      board.lists[listIndex].tasks
    ) {
      const card = board.lists[listIndex].tasks[index];
      console.log(card.name);
      if (card) {
        card.name = newName;
        card.description = description;
      } else {
        console.error(
          `Card not found at index ${index} in list ${listIndex} of board ${boardIndex}`
        );
      }
    } else {
      console.error(
        `Invalid board or list at index ${boardIndex} or ${listIndex}`
      );
    }
    this.boardsChanged.next(this.boards.slice());
  }

  addCardOnBoard(cardTitle: string, listIndex: number, boardIndex: number) {
    this.boards[boardIndex].lists[listIndex].tasks.push(
      new Card(cardTitle, '')
    );
    this.boardsChanged.next(this.boards.slice());
  }
}
