import { Injectable } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { Card } from '../card.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boards: Board[] = [];

  constructor() {}

  getBoards(): Board[] {
    return this.boards;
  }

  addList(newList: List, boardIndex: number) {
    this.boards[boardIndex].lists.push(newList);
  }

  addCardToList(listIndex: number, card: Card, boardIndex: number) {
    console.log(card)
    this.boards[boardIndex].lists[listIndex].tasks.push(card);
  }

  addBoard(newBoard: Board) {
    this.boards.push(newBoard);
    
    
  }

  clearBoard()
  {
    this.boards=[]
  }

  getBoardById(boardIndex: number): Board {
    return this.boards[boardIndex];
    
  }

  editCardName(index: number, newName: string, listIndex: number, boardIndex: number,description:string) {
    const list = this.boards[boardIndex].lists[listIndex];
    list.tasks[index].name = newName;
    list.tasks[index].description = description;


  }

  addCardOnBoard( cardTitle: string, listIndex: number, boardIndex: number) {
    this.boards[boardIndex].lists[listIndex].tasks.push(new Card(cardTitle, ''));
  
  
  
  }
}
