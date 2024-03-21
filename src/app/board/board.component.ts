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
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boards:Board[]=[];
  board: Board;
  isAdd: boolean = false;
  lists: List;
  cards:Card;
  bindex:number
  newListTitle: string = '';
  @ViewChild('inputField') inputField: ElementRef;
  cardName: string;
  addingToListIndex: number = -1;
  inputFieldValue: string = '';
  showModal: boolean=false;
  dialogRef: MatDialogRef<BoardformComponent> | undefined;

  constructor(private boardService: BoardService, public dialog1: MatDialog, private dialog: MatDialog,private http:HttpClient,private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const boardIndex = +params['id']; 
      this.bindex=boardIndex
      this.board = this.boardService.getBoardById(boardIndex);
      console.log(this.board)
      
       
    });
    
    
   
    
  }

  addListToLists(newListTitle: string) {
    const newList = new List(newListTitle, []);
    this.boardService.addList(newList,this.bindex);
    this.newListTitle='';
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
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

  addCard( listIndex: number,cardName: string,bindex:number) {
    console.log(listIndex)
    console.log(cardName)
    console.log(bindex)
    if (cardName.length == 0) return;
    if (this.isAdd && this.addingToListIndex === listIndex) {
      this.isAdd = false;
      this.addingToListIndex = -1;
    } else {
      this.addingToListIndex = listIndex;
      this.isAdd = !this.isAdd;
    }
    this.boardService.addCardOnBoard(cardName,listIndex,bindex);
    
  }

  // Define a boolean flag to control the visibility of boards
showBoardsFlag: boolean = false;

// Function to toggle the visibility of boards
showBoards(){
  
  this.showBoardsFlag = !this.showBoardsFlag;
}

fetchDataFromFirebase() {
  
  this.boardService.clearBoard();
  
  // Make an HTTP GET request to your Firebase Realtime Database URL
  this.http.get<any>('https://trelloclone-219b5-default-rtdb.firebaseio.com/.json')
    .subscribe(data => {
      console.log(data);
      
      
      for (const Key in data) {
        
        const boardData=data[Key];
        
         
        const newBoard = new Board(boardData, []);
        
        
          

          for (const listKey in boardData) {
            if (listKey.startsWith('list')) {
              
              const listData = boardData[listKey];
              const newList = new List(listData, []);

              for (const taskKey in boardData) {
                var i=0;
                
                if (taskKey.startsWith('card'+i)) {
                  const cardData = boardData[taskKey];
                  
                  const newCard = new Card(cardData, '');
                  
                  newList.tasks.push(newCard);
                }
              }
              
              i=i+1;
              newBoard.lists.push(newList);
            }
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
