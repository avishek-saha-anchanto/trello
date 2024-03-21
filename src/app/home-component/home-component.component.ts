import { Component, ElementRef, OnInit, ViewChild ,ChangeDetectorRef} from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { BoardService } from '../service/board.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoardformComponent } from '../boardform/boardform.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Card } from '../card.model';
import { map } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss'
})
export class HomeComponent {
  boards:Board[]=[];
  board: Board;
  isAdd: boolean = false;
  lists: List;
  cards:Card;
  newListTitle: string = '';
  @ViewChild('inputField') inputField: ElementRef;
  cardName: string;
  addingToListIndex: number = -1;
  inputFieldValue: string = '';
  showModal: boolean=false;
  dialogRef: MatDialogRef<BoardformComponent> | undefined;

  constructor(private boardService: BoardService, public dialog1: MatDialog, private dialog: MatDialog,private http:HttpClient,private cdr:ChangeDetectorRef) {}

  ngOnInit() {
    
    this.fetchDataFromFirebase();
    
   
    
  }

  

  

  openBoardFormDialog(): void {
    const dialogRef = this.dialog1.open(BoardformComponent, {
      width: '400px',
      panelClass: 'dialog-container' 
    });
    // Close the sidebar upon opening the dialog
    this.closeSidebar();
  }

  // Method to close the sidebar
  closeSidebar(): void {
    const closeButton = document.querySelector('#offcanvasWithBothOptions .btn-close');
  if (closeButton) {
    (closeButton as HTMLElement).click();
  }
  }

  closeModal(): void {
    this.showModal = false;
  }

  

  // Define a boolean flag to control the visibility of boards
showBoardsFlag: boolean = false;

// Function to toggle the visibility of boards
showBoards(){
  console.log(this.boards)
  // this.fetchDataFromFirebase();
  
  
  this.showBoardsFlag = !this.showBoardsFlag;
}

clearBoard(){
  this.boardService.clearBoard();
}



fetchDataFromFirebase() {
  
  this.boardService.clearBoard();
  
  // Make an HTTP GET request to your Firebase Realtime Database URL
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
