import { Injectable } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { Card } from '../card.model';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boards: Board[] = [];

  constructor(private firebaseService:FirebaseService) {}

  getBoards(): Board[] {
    return this.boards;
  }

  addList(newList: List, boardIndex: number,key:string) {
    
    
    this.firebaseService.postList(key, newList).subscribe(
      response => {
       
       
      },
      error => {
        console.error('Error adding list:', error);
        
      }
    );
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

  editCardName(index: number, newName: string, listIndex: number, boardIndex: number, description: string) {
    const board = this.boards[boardIndex];
    if (board && board.lists && board.lists[listIndex] && board.lists[listIndex].tasks) {
      const card = board.lists[listIndex].tasks[index];
      console.log(card.name)
      if (card) {
        card.name = newName;
        card.description = description;
      } else {
        console.error(`Card not found at index ${index} in list ${listIndex} of board ${boardIndex}`);
      }
    } else {
      console.error(`Invalid board or list at index ${boardIndex} or ${listIndex}`);
    }
  }

  addCardOnBoard( cardTitle: string, listIndex: number, boardIndex: number,key:string) {
    const newCard: Card = { name: cardTitle, description: '' }; 
    console.log(newCard)
    this.firebaseService.addCard(key, listIndex, newCard).subscribe(
    () => {
      
      
    },
    error => {
      console.error('Error adding card:', error);
    }
  );
  }
}
