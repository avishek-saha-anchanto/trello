import { Component, ElementRef, OnInit, ViewChild ,ChangeDetectorRef} from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { BoardService } from '../service/board.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Card } from '../card.model';
import { map } from 'rxjs';
import { response } from 'express';


@Component({
  selector: 'boardform',
  templateUrl: './boardform.component.html',
  styleUrl: './boardform.component.scss'
})
export class BoardformComponent {
  boards: Board[]=[];
  board:Board;

  lists: string[] = [];
  cards: string[][] = [];
  isEditing: boolean[] = [];

  constructor(public dialogRef: MatDialogRef<BoardformComponent>,private http:HttpClient,private boardService:BoardService) { }

  closeModal(): void {
    this.dialogRef.close(); 
  }
  
  toggleEdit(index: number) {
    this.isEditing[index] = !this.isEditing[index];
  }


  onCreatePost(postData: any) {
    
    console.log('Board:', postData.board);
    console.log('List:', this.lists);
    console.log('Cards:', this.cards);

    this.http
      .post(
        'https://trelloclone-219b5-default-rtdb.firebaseio.com/.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });

      this.fetchDataFromFirebase();

      
    
  }




  addList() {
    this.lists.push('');
    this.cards.push([]); 
}

  removeList(index: number) {
    this.lists.splice(index, 1); 
  }

  addCard(index: number) {
    if (!this.cards[index]) {
      this.cards[index] = []; 
    }
    this.cards[index].push(''); 
  }

  removeCard(listIndex: number, cardIndex: number) {
    if (this.cards[listIndex] && this.cards[listIndex].length > cardIndex) {
      this.cards[listIndex].splice(cardIndex, 1); 
    }
  }

  updateList(value: string, index: number) {
    this.lists[index] = value;
}

updateCard(value: string, listIndex: number, cardIndex: number) {
  this.cards[listIndex][cardIndex] = value;
}

fetchDataFromFirebase() {
  
  this.boardService.clearBoard();
  
  
  this.http.get<any>('https://trelloclone-219b5-default-rtdb.firebaseio.com/.json')
    .subscribe(data => {
      
      
      
      for (const Key in data) {
        
        const boardData=data[Key];
        
         
        const newBoard = new Board(boardData, []);
        
        
          
          let j=0;
          for (const listKey in boardData) {
            var idlist='list'+j
            
            
            for(const listKey in boardData){
            if (listKey.startsWith(idlist)) {
              
              const listData = boardData[listKey];
              const newList = new List(listData, []);

               // Initialize i outside the loop
                for (const taskKey in boardData) {
                var id = 'card' + j;
                
                if (taskKey.startsWith(id)) {
                  const cardData = boardData[taskKey];
                  const newCard = new Card(cardData, '');
                  
                  
                  newList.tasks.push(newCard);
                }
                 // Increment i inside the loop
              }
              
              
              
              newBoard.lists.push(newList);
              
              
            }
            
          }
            j++;
          }
          
          var newname=''

          for(const namekey in newBoard)
          {
            
            if(namekey.startsWith('name'))
            {
              
               newname=newBoard[namekey].board
              
            }
          }

          newBoard.name=newname;
          
          this.boardService.addBoard(newBoard);
          
          

        
      }

      

      this.boards=this.boardService.getBoards();
      
    });
  }






}
