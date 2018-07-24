import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { PeopleListComponent } from './people-list/people-list.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PersonEditComponent,
    TabComponent,
    TabsComponent,
    DynamicTabsDirective
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ TabComponent ]
})
export class AppModule { }
