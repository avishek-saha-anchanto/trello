import { Component, Input } from '@angular/core';
import { Card } from '../../card.model';
import { BoardService } from '../../service/board.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-delete',
  templateUrl: './card-delete.component.html',
  styleUrl: './card-delete.component.scss'
})
export class CardDeleteComponent {
@Input() isDelete;
@Input() card:Card;
@Input() index: number;
@Input() listIndex: number;
bindex: number;
constructor(
  private boardService: BoardService,
  private route: ActivatedRoute
) {}
ngOnInit() {
  this.route.params.subscribe((params) => {
    const boardIndex = +params['id'];
    this.bindex = boardIndex;
  });
}
deleteCard()
  {
    console.log("deleteCard:cardcmp",this.bindex,this.listIndex,this.index);
    this.boardService.deleteCard(this.index,this.listIndex,this.bindex);
  }
}
