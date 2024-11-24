import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-dash-board',
  templateUrl: './member-dash-board.component.html',
  styleUrl: './member-dash-board.component.css'
})
export class MemberDashBoardComponent implements OnInit{


  employees = [
    {
      id: 1,
      name: 'Thomas Hardy',
      email: 'ThomasHardy@gmail.com',
      address: '90r parkdground Poland USA.',
      phone: '(78-582552-9)',
      selected: false,
    },
    {
      id: 2,
      name: 'Dominique Perrier',
      email: 'dominiquePerrier@gmail.com',
      address: '90r ser57, Berlin Poland Germany.',
      phone: '(78-5235-2-9)',
      selected: false,
    },
    // Add more employees here...
  ];

  modalMode: 'add' | 'edit' | 'delete' | 'deleteAll' | null = null;
  currentEmployee: any = {};

  openModal(mode: 'add' | 'edit' | 'delete' | 'deleteAll', employee: any = null) {
    this.modalMode = mode;
    this.currentEmployee = employee ? { ...employee } : { id: null, name: '', email: '', address: '', phone: '' };
  }

  closeModal() {
    this.modalMode = null;
    this.currentEmployee = {};
  }

  saveEmployee() {
    if (this.modalMode === 'add') {
      this.employees.push({ ...this.currentEmployee, id: Date.now(), selected: false });
    } else if (this.modalMode === 'edit') {
      const index = this.employees.findIndex((e) => e.id === this.currentEmployee.id);
      if (index > -1) this.employees[index] = { ...this.currentEmployee };
    }
    this.closeModal();
  }

  deleteEmployee() {
    if (this.modalMode === 'delete') {
      this.employees = this.employees.filter((e) => e.id !== this.currentEmployee.id);
    } else if (this.modalMode === 'deleteAll') {
      this.employees = this.employees.filter((e) => !e.selected);
    }
    this.closeModal();
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.employees.forEach((employee) => (employee.selected = checked));
  }

  toggleEmployeeSelection(employee: any) {
    employee.selected = !employee.selected;
  }

 


  constructor() { }


  ngOnInit(): void {
    
  }

}
