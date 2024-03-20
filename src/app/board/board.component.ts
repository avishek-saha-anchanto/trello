import { Component, ElementRef, OnInit, ViewChild ,ChangeDetectorRef} from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { BoardService } from '../service/board.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoardformComponent } from '../boardform/boardform.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boards=["Intern","my project","Test"];
  board: Board;
  isAdd: boolean = false;
  lists: List;
  newListTitle: string = '';
  @ViewChild('inputField') inputField: ElementRef;
  cardName: string;
  addingToListIndex: number = -1;
  inputFieldValue: string = '';
  showModal: boolean=false;
  dialogRef: MatDialogRef<BoardformComponent> | undefined;

  constructor(private boardService: BoardService, public dialog1: MatDialog, private dialog: MatDialog) {}

  ngOnInit() {
    this.board = this.boardService.getBoard();
  }

  addListToLists(newListTitle: string) {
    const newList = new List(newListTitle, []);
    this.boardService.addList(newList);
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

  addCard(cardName: string, listIndex: number) {
    if (cardName.length == 0) return;
    if (this.isAdd && this.addingToListIndex === listIndex) {
      this.isAdd = false;
      this.addingToListIndex = -1;
    } else {
      this.addingToListIndex = listIndex;
      this.isAdd = !this.isAdd;
    }
    this.boardService.addCardOnBoard(listIndex, cardName);
  }

  // Define a boolean flag to control the visibility of boards
showBoardsFlag: boolean = false;

// Function to toggle the visibility of boards
showBoards(): void {
  this.showBoardsFlag = !this.showBoardsFlag;
}

}
