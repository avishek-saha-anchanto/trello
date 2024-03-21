import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'boardform',
  templateUrl: './boardform.component.html',
  styleUrl: './boardform.component.scss'
})
export class BoardformComponent {
  lists: string[] = [];
  cards: string[][] = [];
  isEditing: boolean[] = [];

  constructor(public dialogRef: MatDialogRef<BoardformComponent>,private http:HttpClient) { }

  closeModal(): void {
    this.dialogRef.close(); 
  }
  
  toggleEdit(index: number) {
    this.isEditing[index] = !this.isEditing[index];
  }


  onCreatePost(postData: any) {
    
    console.log('Board:', postData.board);
    console.log('List:', this.lists);
    console.log('Cards:', this.cards);

    this.http
      .post(
        'https://trelloclone-219b5-default-rtdb.firebaseio.com/.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
    
  }

  addList() {
    this.lists.push('');
    this.cards.push([]); 
}

  removeList(index: number) {
    this.lists.splice(index, 1); 
  }

  addCard(index: number) {
    if (!this.cards[index]) {
      this.cards[index] = []; 
    }
    this.cards[index].push(''); 
  }

  removeCard(listIndex: number, cardIndex: number) {
    if (this.cards[listIndex] && this.cards[listIndex].length > cardIndex) {
      this.cards[listIndex].splice(cardIndex, 1); 
    }
  }

  updateList(value: string, index: number) {
    this.lists[index] = value;
}

updateCard(value: string, listIndex: number, cardIndex: number) {
  this.cards[listIndex][cardIndex] = value;
}


}
