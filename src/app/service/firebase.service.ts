import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Board } from '../board.model';
import { List } from '../list.model';
import { Card } from '../card.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  // Function to fetch data from Firebase
  fetchData(): Observable<any> {
    return this.http.get<any>(
      'https://trelloclone-219b5-default-rtdb.firebaseio.com/.json'
    );
  }

  postData(board: Board) {
    //     this.http.delete('https://trelloclone-219b5-default-rtdb.firebaseio.com/.json').subscribe(res => {
    //   console.log("deleted");
    // });

    this.http
      .post(
        'https://trelloclone-219b5-default-rtdb.firebaseio.com/.json',
        board
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchBoards(): Observable<Board[]> {
    //     this.http.delete('https://trelloclone-219b5-default-rtdb.firebaseio.com/.json').subscribe(res => {
    //   console.log("deleted");
    // });
    // const dummyData: Board[] = [
    //   new Board('Board 1', [
    //     new List('List 1', [
    //       new Card('Card 1', 'Description 1'),
    //       new Card('Card 2', 'Description 2')
    //     ]),
    //     new List('List 2', [
    //       new Card('Card 3', 'Description 3'),
    //       new Card('Card 4', 'Description 4')
    //     ])
    //   ]),
    //   new Board('Board 2', [
    //     new List('List A', [
    //       new Card('Card A', 'Description A'),
    //       new Card('Card B', 'Description B')
    //     ]),
    //     new List('List B', [
    //       new Card('Card X', 'Description X'),
    //       new Card('Card Y', 'Description Y'),
    //       new Card('Card Z', 'Description Z')
    //     ])
    //   ]),
    // ]; 
    // return of(dummyData);
   
    return this.http.get<any>( 'https://trelloclone-219b5-default-rtdb.firebaseio.com/.json').pipe(
      map(data => {
        const boards: Board[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const boardData = data[key];
            const lists: List[] = [];
            for (const listData of boardData.lists) {
              const tasks: Card[] = [];
              for (const taskData of listData.tasks) {
                tasks.push({
                  name: taskData.name,
                  description: taskData.description
                });
              }
              lists.push({
                name: listData.name,
                tasks: tasks
              });
            }
            boards.push({
              name: boardData.name,
              lists: lists,
            });
          }
        }
        return boards;
      })
    );
  }
}
