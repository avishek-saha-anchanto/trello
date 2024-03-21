import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../../service/board.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Card } from '../../card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() index: number;
  @Input() listName: string;
  @Input() listIndex: number;

  newTitle: string = '';
  description: string = '';

  constructor(
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {}
  onSaveEdit() {
    this.boardService.editCardName(
      this.index,
      this.newTitle,
      this.description,
      this.listName
    );
    this.newTitle='';
    this.description='';
  }
  openModalCardEdit() {
    this.router.navigate(['edit', this.listName, this.index], {
      relativeTo: this.route,
    });
  }
  openModalCardDetail() {
    this.router.navigate(['detail', this.listName, this.index], {
      relativeTo: this.route,
    });
    console.log(this.card);
  }
  closeModalCardDetail() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
