import { Component, OnInit } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { BoardService } from '../service/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  board: Board ;
  lists : List;
  newListTitle: string = '';


  constructor(private boardService:BoardService ){}
  ngOnInit() {
    this.board=this.boardService.getBoard();
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

}
