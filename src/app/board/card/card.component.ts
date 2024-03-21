import { Component, Input } from '@angular/core';
import { BoardService } from '../../service/board.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Card } from '../../card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card:Card;
  @Input() index: number;
  @Input() listName: string;

  newTitle: string = '';
  description: string = '';

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSaveEdit() {
    this.boardService.editCardName(this.index, this.newTitle,this.description, this.listName);
    console.log(this.listName);
    console.log(this.index);
  }
  openModalCardDetail() {
    this.router.navigate(['detail'], { relativeTo: this.route });
    //this.card=this.boardService.getCard(this.index,this.listName);
  }
  closeModalCardDetail() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

}
