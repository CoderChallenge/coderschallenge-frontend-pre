import { Injectable } from '@angular/core';
import { IMenuItem } from '@app/shared/common/model/IMenuItem';
import { BehaviorSubject } from 'rxjs';
import { UserTypes } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor() { }

  organizerMenu: IMenuItem[] = [
    {
      name: 'Dashboard',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard.svg',
      stateName: 'dashboard',
      state: '/organizer/dashboard'
    },
    {
      name: 'Challenge',
      type: 'link',
      tooltip: 'Challenge',
      icon: 'basic.svg',
      stateName: 'challenge',
      state: '/organizer/challenge/list'
    }
  ];

  adminMenu: IMenuItem[] = [
    {
      name: 'Dashboard',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard.svg',
      stateName: 'dashboard',
      state: '/admin/dashboard'
    },
    {
      name: 'Track',
      type: 'link',
      tooltip: 'Track',
      icon: 'collapse.svg',
      stateName: 'track',
      state: '/admin/track'
    },
    {
      name: 'Level',
      type: 'link',
      tooltip: 'Level',
      icon: 'widgets.svg',
      stateName: 'level',
      state: '/admin/level'
    }
  ];

  participantMenu: IMenuItem[] = [
    {
      name: 'Dashboard',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard.svg',
      state: '/user/dashboard'
    },
    {
      name: 'Challenge',
      type: 'link',
      tooltip: 'Challenge',
      icon: 'fa fa-code',
      state: '/organizer/challenge/create'
    },
  ];
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.organizerMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case UserTypes.organizer:
        this.menuItems.next(this.organizerMenu);
        break;
      case UserTypes.admin:
        this.menuItems.next(this.adminMenu);
        break;
      case UserTypes.participant:
        this.menuItems.next(this.participantMenu);
        break;
      default:
        this.menuItems.next(this.organizerMenu);
    }
  }
}
