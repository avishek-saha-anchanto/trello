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
import { Observable,of } from 'rxjs';



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
  key:string='';
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
      this.boards=this.boardService.getBoards();
      this.board=this.boards[this.bindex];
    });
    this.boardService.boardsChanged.subscribe((boards:Board[])=>{
      this.boards=boards;
      this.board=this.boards[this.bindex];
      // console.log("bcom ngSubs",boards[this.bindex]);
    })

    
    
    
   
    
  }

  addListToLists(newListTitle: string) {
    console.log(this.boards)
    this.key=this.boards[this.bindex].key;
    console.log(this.key)
    const newList = new List(newListTitle, []);
    newList.tasks=[];
    this.boardService.addList(newList,this.bindex,this.key);
    this.newListTitle='';
    this.fetchDataFromFirebase();
    
    

  }

  fetchDataFromFirebase() {
    this.firebaseService.fetchBoards().subscribe(res=>{
      console.log(res);
      this.boards=res;
      console.log(this.boards)
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.boardService.setBoards(this.boards);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.boardService.setBoards(this.boards);
    }
    
  }
  drop2(event: CdkDragDrop<string[]>,lists:List[]) {
    moveItemInArray(lists, event.previousIndex, event.currentIndex);
    this.boardService.setBoards(this.boards);

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
    
    this.key=this.boards[this.bindex].key;
    if (cardName.length == 0) return;
    if (this.isAdd && this.addingToListIndex === listIndex) {
      this.isAdd = false;
      this.addingToListIndex = -1;
    } else {
      this.addingToListIndex = listIndex;
      this.isAdd = !this.isAdd;
    }
    this.boardService.addCardOnBoard(cardName, listIndex, bindex, this.key)
    

    
    
  }

  // Define a boolean flag to control the visibility of boards
showBoardsFlag: boolean = false;

// Function to toggle the visibility of boards
showBoards(){
  
  this.showBoardsFlag = !this.showBoardsFlag;
}

saveChanges()
{
  
  this.boardService.setBoards(this.boards);
  this.firebaseService.updateData(this.board);
  console.log(this.boards)
}

deleteList(listIndex: number) {
  console.log(this.board)
  console.log(this.board.lists)
  console.log(listIndex)
  if (confirm('Are you sure you want to delete this list?')) {
    this.boardService.deleteList(listIndex,this.bindex)
  }
}

}
