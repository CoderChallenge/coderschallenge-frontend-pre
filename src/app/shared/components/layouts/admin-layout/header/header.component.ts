import { Component, OnInit } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

  toggleMenu(){
    /* -- Menu Hamburger -- */
    const body = document.querySelector('body');
    body.classList.toggle('toggle-menu');
    $('.menu-hamburger img').toggle();
  }

}
