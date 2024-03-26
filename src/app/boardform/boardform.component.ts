import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../service/firebase.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { BoardService } from '../service/board.service';

@Component({
  selector: 'boardform',
  templateUrl: './boardform.component.html',
  styleUrl: './boardform.component.scss',
})
export class BoardformComponent {
  boardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private dialogRef: MatDialogRef<BoardformComponent>,
    private boardService:BoardService
  ) {
    this.createForm();
  }

  createForm() {
    this.boardForm = this.fb.group({
      name: ['', Validators.required],
      lists: this.fb.array([this.initList()]),
    });
  }

  initList(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      tasks: this.fb.array([this.initTask()]),
    });
  }

  initTask(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  addList() {
    const lists = this.boardForm.get('lists') as FormArray;
    lists.push(this.initList());
  }

  removeList(index: number) {
    const lists = this.boardForm.get('lists') as FormArray;
    lists.removeAt(index);
  }

  addTask(listIndex: number) {
    const lists = this.boardForm.get('lists') as FormArray;
    const tasks = lists.at(listIndex).get('tasks') as FormArray;
    tasks.push(this.initTask());
  }

  removeTask(listIndex: number, taskIndex: number) {
    const lists = this.boardForm.get('lists') as FormArray;
    const tasks = lists.at(listIndex).get('tasks') as FormArray;
    tasks.removeAt(taskIndex);
  }

  onSubmit() {
    //this.router.navigateByUrl('/');
    if (this.boardForm.valid) {
      console.log(this.boardForm.value);

      this.firebaseService.postData(this.boardForm.value);
      this.boardService.addBoard(this.boardForm.value);
    }
    this.dialogRef.close();
  }

  getControls(): any[] {
    return (this.boardForm.get('lists') as FormArray).controls;
  }
}
