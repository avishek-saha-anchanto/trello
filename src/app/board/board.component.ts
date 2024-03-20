import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { BoardService } from '../service/board.service';
import { MatDialog } from '@angular/material/dialog';
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
  showModal: boolean=false;
  
  constructor(private boardService: BoardService,public dialog: MatDialog) {}

  ngOnInit() {
    this.board = this.boardService.getBoard();
  }

  addListToLists(newListTitle: string) {
    const newList = new List(newListTitle, []);
    this.boardService.addList(newList);
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
    const dialogRef = this.dialog.open(BoardformComponent, {
      width: '400px'
    });
  }

  closeModal(): void {
    
    this.showModal = false;
  }

  addCard(cardName: string, listIndex: number) {
    if(cardName.length==0)
    return;
    if (this.isAdd && this.addingToListIndex === listIndex) {
      this.isAdd = false;
      this.addingToListIndex = -1;
    } else {
      this.addingToListIndex = listIndex;
      this.isAdd = !this.isAdd;
    }
    this.boardService.addCardOnBoard(listIndex, cardName);
    this.inputField.nativeElement.value = '';

  }
}

