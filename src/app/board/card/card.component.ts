import { Component, Input } from '@angular/core';
import { BoardService } from '../../service/board.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item: string;
  @Input() index:number;
  @Input() listName:string;
  isEdit: boolean = false;

  constructor(private boardService:BoardService){}
  onEdit() {
    this.isEdit = !this.isEdit;
  }
  onSave()
  {
    this.isEdit = !this.isEdit;
    this.boardService.editCardName(this.index,this.item,this.listName);
  }
}