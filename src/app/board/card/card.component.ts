import { Component, Input } from '@angular/core';
import { BoardService } from '../../service/board.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item: string;
  @Input() index: number;
  @Input() listName: string;

  newTitle: string = '';
  description: string = '';

  constructor(private boardService: BoardService) {}

  onSave() {
    this.boardService.editCardName(this.index, this.newTitle, this.listName);
    console.log(this.listName);
    console.log(this.index);
  }
}
