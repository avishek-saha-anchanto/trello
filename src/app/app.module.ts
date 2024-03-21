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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home-component/home-component.component';



const appRoutes:Routes=[
  {path: 'boardform',component:BoardformComponent},
  {path:'',component: HomeComponent},
  {path: 'board/:id', component: BoardComponent }


]

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    BoardformComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,DragDropModule,RouterModule.forRoot(appRoutes),FormsModule,HttpClientModule
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
