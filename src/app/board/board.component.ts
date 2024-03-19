import { Component } from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  constructor() { }

  board: Board = new Board('Test Board', [
    new List('To do', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new List('In progress', [
      'Finishing project'
    ]),
    new List('Done', [
      'Created a recipe app',
      'Angular Course'
    ])
  ]);

  ngOnInit() {
  }
}
