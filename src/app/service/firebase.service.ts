import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Board } from '../board.model';

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
    return this.http
      .get<{ [key: string]: any }>(
        'https://ng-complete-guide-c56d3.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const boardsArray: Board[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const boardData = responseData[key];
              boardsArray.push(boardData);
            }
          }
          return boardsArray;
        }),
        catchError((errorRes) => {
          // You can handle the error in any way you want here
          console.error('An error occurred:', errorRes);
          return throwError(() => new Error('Something went wrong.'));
        })
      );
  }
}
