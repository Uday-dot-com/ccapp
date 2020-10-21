import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [ 
    { path: '/dashboard', title: 'Manage User',  icon: 'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any;

  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit() {
    this.getMenu();
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
  getMenu(){
    this.menuItems = JSON.parse(localStorage.getItem('menu'));
  }
}
