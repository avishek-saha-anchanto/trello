import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, mergeMap, throwError } from 'rxjs';
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

  fetchBoard(boardKey: string): Observable<Board> {
    return this.http.get<any>(`https://trelloclone-219b5-default-rtdb.firebaseio.com/${boardKey}.json`);
  }

  // Function to update board data in Firebase
  updateBoard(boardKey: string, board: Board) {
    console.log(board)
    return this.http.put(`https://trelloclone-219b5-default-rtdb.firebaseio.com/${boardKey}.json`, board);
  }

  // Function to add a list to a specific board in Firebase
  postList(boardKey: string, newList: List): Observable<any> {
    return this.fetchBoard(boardKey).pipe(
      mergeMap((board: Board) => {
        newList.tasks=[];
        
        // Add the new list to the existing array of lists in the board
        board.lists.push(newList);
        

        // Update the board data in Firebase with the modified lists array
        return this.updateBoard(boardKey, board);
      })
    );
  }

  addCard(boardKey: string, listIndex: number, card: Card): Observable<any> {
    return this.fetchBoard(boardKey).pipe(
      mergeMap((board: Board) => {
        
        if (listIndex < 0 || listIndex >= board.lists.length) {
          return throwError('Invalid list index');
        }
  
        board.lists[listIndex].tasks = board.lists[listIndex].tasks ? board.lists[listIndex].tasks : [];
        board.lists[listIndex].tasks.push(card);
  
        
        return this.updateBoard(boardKey, board);
      })
    );
  }


  



  fetchBoards(): Observable<Board[]> {
    return this.http.get<any>('https://trelloclone-219b5-default-rtdb.firebaseio.com/.json').pipe(
      map(data => {
        const boards: Board[] = [];
  
        for (const key in data) {
          console.log(key)
          if (data.hasOwnProperty(key)) {
            const boardData = data[key];
            const lists: List[] = [];
            if (Array.isArray(boardData.lists)) {
              for (const listData of boardData.lists) {
                console.log(listData)
                const tasks: Card[] = [];
                if (listData.tasks && Array.isArray(listData.tasks)) {
                  for (const taskData of listData.tasks) {
                    console.log(taskData)
                    tasks.push({
                      name: taskData.name,
                      description: taskData.description
                    });
                  }
                }
                lists.push({
                  name: listData.name,
                  tasks: tasks
                });
              }
            }
            boards.push({
              name: boardData.name,
              lists: lists,
              key: key
            });
          }
        }
        return boards;
      })
    );
  }
  
}
