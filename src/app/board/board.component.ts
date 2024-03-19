import { Component, OnInit } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { BoardService } from '../service/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  board: Board ;

  constructor(private boardService:BoardService ){}
  ngOnInit() {
    this.board=this.boardService.getBoard();
  }
  
}
