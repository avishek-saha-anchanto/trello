import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  // Function to fetch data from Firebase
  fetchData(): Observable<any> {
    return this.http.get<any>('https://trelloclone-219b5-default-rtdb.firebaseio.com/.json');
  }
}
