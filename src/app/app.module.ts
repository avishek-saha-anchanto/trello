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
import { CardDetailsComponent } from './board/card-details/card-details.component';

const appRoutes: Routes = [
  { path: 'boardform', component: BoardformComponent },
  {
    path: '',
    redirectTo: '/test',
    pathMatch: 'full',
  },
  {
    path: 'test',
    component: BoardComponent,
    children: [{ path: 'detail/:id/:id', component: CardComponent}],
  },
  { path: ':boardName', component: BoardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    BoardformComponent,
    CardDetailsComponent,
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
