import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../../service/board.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.scss',
})
export class CardEditComponent implements OnInit {
  @Input() isModalEdit;
  @Input() index: number;
  @Input() listName: string;
  @Input() listIndex: number;
  bindex: number;

  newTitle: string = '';
  description: string = '';

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
  closeModal() {
    this.isModalEdit = false;
  }

  handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
  handleContentClick(event: MouseEvent) {
    event.stopPropagation(); 
  }

  onSave() {
    this.boardService.editCardName(
      this.index,
      this.newTitle,
      this.listIndex,
      this.bindex,
      this.description
    );
    this.closeModal();
    this.newTitle = '';
    this.description = '';
  }
}
