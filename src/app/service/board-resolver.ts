import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveData,
  RouterStateSnapshot,
} from '@angular/router';
import { FirebaseService } from './firebase.service';
import { Resolve } from '@angular/router';
import { BoardService } from './board.service';
import { Board } from '../board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardResolver implements Resolve<any> {
  boards: Board[];
  constructor(
    private boardService: BoardService,
    private firebaseService: FirebaseService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.boards=this.boardService.getBoards();
     if(this.boards!==undefined)
     return null;

    this.firebaseService.fetchBoards().subscribe({
      next: (res: Board[]) => {
        console.log('res');
        this.boards = res;
        this.boardService.setBoards(res);
      },
      error: (error) => {
        console.error('An error occurred:', error.message);
        // Handle the error as needed
      },
    });
    return null;
  }
}
