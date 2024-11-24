import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

  activeMenu = '';

  isActive(menu: string): boolean {
    return this.activeMenu === menu;
  }

  setActiveMenu(menu: string): void {
    this.activeMenu = menu;
  }


  isSidebarCollapsed = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  


 }
