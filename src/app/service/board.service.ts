import { Injectable } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { Card } from '../card.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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

  addList(newList: List, boardIndex: number, key: string) {
    this.boards[boardIndex].lists.push(newList);
    this.boardsChanged.next(this.boards.slice());
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

      if (card) {
        card.name = newName;
        card.description = description;
        card.updatedAt = new Date();
       // delete card.createdAt;
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

  addCardOnBoard(
    cardTitle: string,
    listIndex: number,
    boardIndex: number,
    key: string
  ) {
    const newCard: Card = { name: cardTitle, description: '' };
    newCard.createdAt = new Date();
    console.log(newCard);
    this.boards[boardIndex].lists[listIndex].tasks.push(newCard);
    this.boardsChanged.next(this.boards.slice());
  }

  deleteList(listIndex: number, bindex: number) {
    this.boards[bindex].lists.splice(listIndex, 1);
    this.boardsChanged.next(this.boards.slice());
  }

  deleteCard(cardIndex: number, listIndex: number, bIndex: number) {
    console.log('Service Delete Card', cardIndex, listIndex, bIndex);

    const board = this.boards[bIndex];
    console.log(board);
    const list = board.lists[listIndex];
    console.log(list);

    if (!list || !list.tasks || !Array.isArray(list.tasks)) {
      console.error('Invalid list or tasks array:', list);
      return;
    }

    list.tasks.splice(cardIndex, 1);

    console.log('Service deleted card', this.boards[bIndex]);
    console.log('list', list);
    // Emit the updated boards array to subscribers
    this.boardsChanged.next(this.boards.slice());
  }
}
