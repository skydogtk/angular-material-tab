import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule
  ],
  declarations: []
})
export class MaterialModule { }
