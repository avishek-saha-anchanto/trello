import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardComponent } from './board/card/card.component';
import { BoardformComponent } from './boardform/boardform.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home-component/home-component.component';
import { CardDetailsComponent } from './board/card-details/card-details.component';
import path from 'path';
import { CardEditComponent } from './board/card-edit/card-edit.component';
import { BoardResolver } from './service/board-resolver';



const appRoutes:Routes=[
  {path:'',component: HomeComponent, pathMatch: 'full',resolve:[BoardResolver]},
  {path: 'boardform',component:BoardformComponent},
  {path: 'board/:id', component: BoardComponent,children:[
    { path: 'detail/:id/:id', component: CardDetailsComponent}
  ] },


]

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    BoardformComponent,
    HomeComponent,
    CardDetailsComponent,
    CardEditComponent
  ],
  imports: [
    BrowserModule,DragDropModule,RouterModule.forRoot(appRoutes),FormsModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
