import { Component, Input } from '@angular/core';
import { BoardService } from '../../service/board.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

  ngOnInit() {
    this.route.params.subscribe(params => {
      const boardIndex = +params['id']; 
      this.bindex=boardIndex
      
      
       
    });
    
    
   
    
  }

  
  bindex:number


    
  @Input() item: Card;
  @Input() index: number;
  @Input() listName: string;
  @Input() listIndex: number;
  @Input() boardIndex: number;

  newTitle: string = '';
  description: string = '';

  constructor(private boardService: BoardService,private route:ActivatedRoute) {}

    

  onSave() {
    
    console.log(this.index);
    this.boardService.editCardName(this.index, this.newTitle,this.listIndex,this.bindex,this.description);
    
  }


}
