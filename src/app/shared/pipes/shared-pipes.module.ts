import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './excerpt.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

const pipes = [
  ExcerptPipe,
  RelativeTimePipe,
  SearchFilterPipe,
  SafeHtmlPipe
];


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule { }
