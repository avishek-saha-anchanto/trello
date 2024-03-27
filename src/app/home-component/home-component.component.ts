import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Board } from '../board.model';
import { List } from '../list.model';
import { BoardService } from '../service/board.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoardformComponent } from '../boardform/boardform.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Card } from '../card.model';
import { Subscription, map } from 'rxjs';
import { response } from 'express';
import { FirebaseService } from '../service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss',
})
export class HomeComponent {
  boards: Board[] = [];
  board: Board;
  isAdd: boolean = false;
  lists: List;
  cards: Card;
  newListTitle: string = '';
  @ViewChild('inputField') inputField: ElementRef;
  cardName: string;
  addingToListIndex: number = -1;
  inputFieldValue: string = '';
  showModal: boolean = false;
  dialogRef: MatDialogRef<BoardformComponent> | undefined;
  boardSubcription: Subscription;

  constructor(
    private boardService: BoardService,
    public dialog1: MatDialog,
    private dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    // this.fetchDataFromFirebase();
  }

  ngOnInit() {
    // this.fetchDataFromFirebase();
    this.boards = this.boardService.getBoards();
    console.log(this.boards);
    this.boardSubcription = this.boardService.boardsChanged.subscribe(
      (boards: Board[]) => {
        this.boards = boards;
      }
    );
  }

  openBoardFormDialog(): void {
    //  this.router.navigateByUrl('/boardform');
    const dialogRef = this.dialog1.open(BoardformComponent, {
      width: '400px',
      panelClass: 'dialog-container',
    });

    // Close the sidebar upon opening the dialog
    this.closeSidebar();
  }

  // Method to close the sidebar
  closeSidebar(): void {
    const closeButton = document.querySelector(
      '#offcanvasWithBothOptions .btn-close'
    );
    if (closeButton) {
      (closeButton as HTMLElement).click();
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  // Define a boolean flag to control the visibility of boards
  showBoardsFlag: boolean = false;

  // Function to toggle the visibility of boards
  showBoards() {
    console.log(this.boards);
    this.showBoardsFlag = !this.showBoardsFlag;
  }

}
