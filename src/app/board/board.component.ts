import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { BoardService } from '../service/board.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  boards=["Intern","my project","Test"];
  board: Board;
  isAdd: boolean = false;
  @ViewChild('inputField') inputField: ElementRef;
  cardName: string;
  addingToListIndex: number = -1;
  constructor(private boardService: BoardService) {}
  ngOnInit() {
    this.board = this.boardService.getBoard();
  }
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
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
