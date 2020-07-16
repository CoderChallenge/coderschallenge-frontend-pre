import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutsModule } from '@app/shared/components//layouts/layouts.module';
import { ButtonComponent } from '@app/shared/components//button/button.component';
import { FooterComponent } from '@app/shared/components//footer/footer.component';
import { AlertComponentComponent } from '@app/shared/components//alert-component/alert-component.component';
import { MustMatchDirective } from '@app/shared/directives/must-match.directive';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';

const components =  [
     ButtonComponent,
     FooterComponent,
     LoaderComponent,
     AlertComponentComponent,
     MustMatchDirective
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    RouterModule,
    LayoutsModule
  ]
})
export class SharedComponentsModule { }
