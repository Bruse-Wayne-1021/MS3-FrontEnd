import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-records',
  templateUrl: './member-records.component.html',
  styleUrl: './member-records.component.css'
})
export class MemberRecordsComponent implements OnInit {

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  users = [
    {
      image: 'assets/michael.jpg',
      name: 'Michael Holz',
      dateCreated: '04/10/2013',
      role: 'Admin',
      status: 'Active',
    },
    {
      image: 'assets/paula.jpg',
      name: 'Paula Wilson',
      dateCreated: '05/08/2014',
      role: 'Publisher',
      status: 'Active',
    },
    {
      image: 'assets/antonio.jpg',
      name: 'Antonio Moreno',
      dateCreated: '11/05/2015',
      role: 'Publisher',
      status: 'Suspended',
    },
    {
      image: 'assets/mary.jpg',
      name: 'Mary Saveley',
      dateCreated: '06/09/2016',
      role: 'Reviewer',
      status: 'Active',
    },
    {
      image: 'assets/martin.jpg',
      name: 'Martin Sommer',
      dateCreated: '12/08/2017',
      role: 'Moderator',
      status: 'Inactive',
    },
  ];

  filteredUsers() {
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  totalPages() {
    return Array(
      Math.ceil(this.filteredUsers().length / this.itemsPerPage)
    ).fill(0);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages().length) this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  // Delete User Method
  deleteUser(user: any) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        this.users.splice(index, 1);
      }
    }
  }

  // Edit User Method (For Settings Button)
  editUser(user: any) {
    alert(`Settings for user: ${user.name}`);
    // Add more logic here to open a settings form or modal
  }
  constructor() { }

  ngOnInit(): void {

  }

}
