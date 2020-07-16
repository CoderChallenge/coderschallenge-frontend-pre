import {  Directive, ElementRef, Input } from '@angular/core';


@Directive({
// tslint:disable-next-line:directive-selector
selector: '[href]',
// tslint:disable-next-line:use-host-property-decorator
host: {'(click)': 'preventDefault($event)'},
})
export class HrefPreventDefaultDirective{
@Input() href: string;

constructor(private el: ElementRef)  {}

preventDefault(event)  {
    if (this.href.length === 0 || this.href === '#') {
      event.preventDefault();
      }
  }

}
