import { Component } from '@angular/core';
import { AuthenticationService } from '@app/shared/services/authentication.service';
declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthenticationService) { }

  get name(){
    return this.authService.decodeToken.name;
  }

  toggleMenu(){
    /* -- Menu Hamburger -- */
    const body = document.querySelector('body');
    body.classList.toggle('toggle-menu');
    $('.menu-hamburger img').toggle();
  }

}
