import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LayoutsModule } from '@app/shared/components//layouts/layouts.module';
import { ButtonComponent } from '@app/shared/components//button/button.component';
import { FooterComponent } from '@app/shared/components//footer/footer.component';
import { AlertComponentComponent } from '@app/shared/components//alert-component/alert-component.component';
import { MustMatchDirective } from '@app/shared/directives/must-match.directive';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { ListComponent } from '@app/shared/components/challenge/list/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedPipesModule } from '@app/shared/pipes/shared-pipes.module';

const components =  [
     ButtonComponent,
     FooterComponent,
     LoaderComponent,
     AlertComponentComponent,
    ListComponent,
     MustMatchDirective
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    RouterModule,
    LayoutsModule,
    FormsModule,
    SharedPipesModule,
    NgbModule
  ]
})
export class SharedComponentsModule { }
