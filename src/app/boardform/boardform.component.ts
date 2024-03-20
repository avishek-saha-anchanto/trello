import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'boardform',
  templateUrl: './boardform.component.html',
  styleUrl: './boardform.component.scss'
})
export class BoardformComponent {
  lists: string[] = [];
  cards: string[][] = [];
  isEditing: boolean[] = [];

  constructor(public dialogRef: MatDialogRef<BoardformComponent>) { }

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
    
  }

  addList() {
    this.lists.push('');
    this.cards.push([]); // Make sure to add an empty array for cards too
}

  removeList(index: number) {
    this.lists.splice(index, 1); // Remove the list at the specified index
  }

  addCard(index: number) {
    if (!this.cards[index]) {
      this.cards[index] = []; // Initialize the array if it's not initialized yet
    }
    this.cards[index].push(''); // Add an empty card to the corresponding list
  }

  removeCard(listIndex: number, cardIndex: number) {
    if (this.cards[listIndex] && this.cards[listIndex].length > cardIndex) {
      this.cards[listIndex].splice(cardIndex, 1); // Remove the card at the specified index from the corresponding list
    }
  }

  updateList(value: string, index: number) {
    this.lists[index] = value;
}

updateCard(value: string, listIndex: number, cardIndex: number) {
  this.cards[listIndex][cardIndex] = value;
}


}
