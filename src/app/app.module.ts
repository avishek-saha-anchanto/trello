import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CardComponent } from './board/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,DragDropModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
