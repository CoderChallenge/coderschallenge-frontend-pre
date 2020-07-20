import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
      MatSnackBarModule,
    ToastrModule.forRoot(),
    SharedComponentsModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class SharedModule { }
