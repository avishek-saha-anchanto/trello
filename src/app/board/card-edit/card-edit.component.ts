import { Component, Input } from '@angular/core';
import { BoardService } from '../../service/board.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.scss',
})
export class CardEditComponent {
  @Input() isModalEdit;

  constructor(boardService:BoardService){}
  closeModal() {
    this.isModalEdit = !this.isModalEdit;
  }
  
  onSave() {

  }
}
