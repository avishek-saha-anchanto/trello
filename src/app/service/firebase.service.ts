import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
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
