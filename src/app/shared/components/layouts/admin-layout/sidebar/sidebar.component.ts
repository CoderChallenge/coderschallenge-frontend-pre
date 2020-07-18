import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/shared/services/authentication.service';
import { NavigationService } from '@app/shared/services/navigation.service';
import { IMenuItem } from '@app/shared/common/model/IMenuItem';
import { DataStoreService } from '@app/shared/services/data-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedItem: IMenuItem;
  nav: IMenuItem[];
  email: string;
  nickName: string;
  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private dataService: DataStoreService,
              private navService: NavigationService
             ) { }

  ngOnInit() {
    const { role, email, username: nickName } = this.authenticationService;
    this.email = email;
    this.nickName = nickName;
    this.navService.publishNavigationChange(role);
    this.navService.menuItems$.subscribe(items => {
      this.nav = items;
      this.setActiveFlag();
    });
  }

  onClickChangeActiveFlag(item) {
    this.setActiveMainItem(item);
  }

  setActiveMainItem(menu) {
    this.nav.forEach(item => {
      item.active = false;
    });

    menu.active = true;
  }

  setActiveFlag() {
    if (window && window.location) {
      const {pathname, hash} = window.location;
      const activeRoute = hash || pathname;
      this.nav.forEach(item => {
        const pathName = activeRoute.split('/');
        const stateNameFromRoute = pathName.find(x => x === item.stateName);
        item.active = false;
        if (activeRoute.indexOf(item.stateName) !== -1 && item.stateName === stateNameFromRoute) {
          this.selectedItem = item;
          item.active = true;
        }
        if (item.sub) {
          item.sub.forEach(subItem => {
            subItem.active = false;
            if (activeRoute.indexOf(subItem.state) !== -1) {
              this.selectedItem = item;
              item.active = true;
              // subItem.active = true;
              // debugger;
            }
            if (subItem.sub) {
              subItem.sub.forEach(subChildItem => {
                if (activeRoute.indexOf(subChildItem.state) !== -1) {
                  this.selectedItem = item;
                  item.active = true;
                  subItem.active = true;
                }
              });
            }
          });
        }
      });
    }
  }

  logout(){
    this.dataService.removeAllPersistedData();
    this.router.navigate(['/auth/login']);
  }

}
