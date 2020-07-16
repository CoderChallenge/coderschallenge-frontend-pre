import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { HeaderComponent } from './admin-layout/header/header.component';


const components = [
  AuthLayoutComponent,
  AdminLayoutComponent,
  SidebarComponent,
  HeaderComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: components
})
export class LayoutsModule { }
