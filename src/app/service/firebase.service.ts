import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, of, throwError } from 'rxjs';
import { Board } from '../board.model';
import { List } from '../list.model';
import { Card } from '../card.model';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  boardKey:string


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
    return this.http
      .get<any>('https://trelloclone-219b5-default-rtdb.firebaseio.com/.json')
      .pipe(
        map((data) => {
          const boards: Board[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const boardData = data[key];
              const lists: List[] = [];
              if (Array.isArray(boardData.lists)) {
                for (const listData of boardData.lists) {
                  const tasks: Card[] = [];
                  if (listData.tasks && Array.isArray(listData.tasks)) {
                    for (const taskData of listData.tasks) {
                      tasks.push({
                        name: taskData.name,
                        description: taskData.description,
                      });
                    }
                  }
                  lists.push({
                    name: listData.name,
                    tasks: tasks,
                  });
                }
              }
              boards.push({
                name: boardData.name,
                lists: lists,
                key: key,
              });
            }
          }
          return boards;
        })
      );
  }
  updateData(board: any) {
    this.boardKey=board.key
    console.log(board)
    return this.http.put(`https://trelloclone-219b5-default-rtdb.firebaseio.com/${this.boardKey}.json`, board).subscribe(res=>{
      console.log(res)
    });
      
  }
  

}
