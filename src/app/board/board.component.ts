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
import { FirebaseService } from '../service/firebase.service';



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

  constructor(private boardService: BoardService, public dialog1: MatDialog, private dialog: MatDialog,private http:HttpClient,private route:ActivatedRoute,private firebaseService:FirebaseService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const boardIndex = +params['id']; 
      this.bindex=boardIndex;
      this.firebaseService.fetchBoards().subscribe({
        next: (res: Board[]) => {
          console.log(res);
          this.board = res[this.bindex];
        },
        error: (error) => {
          console.error('An error occurred:', error);
          // Handle the error as needed
        }
      });
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
  drop2(event: CdkDragDrop<string[]>,lists:List[]) {
    moveItemInArray(lists, event.previousIndex, event.currentIndex);
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
  this.firebaseService.fetchBoards().subscribe(res=>{
    console.log(res);
    this.boards=res;

  });
  
  
  }


}
