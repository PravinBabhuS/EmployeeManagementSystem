import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [
    // {
    //   id: 'a1',
    //   name: 'Abhishek',
    //   email: 'Abhishek@gmail.com',
    //   phone: 1234567890,
    //   salary: 25000,
    //   department: 'Human Resources',
    // },
    // {
    //   id: 'a2',
    //   name: 'Babhu',
    //   email: 'Babhu@gmail.com',
    //   phone: 1234567890,
    //   salary: 35000,
    //   department: 'IT',
    // },
    // {
    //   id: 'a3',
    //   name: 'Chris',
    //   email: 'Chris@gmail.com',
    //   phone: 1234567890,
    //   salary: 26000,
    //   department: 'Development and Maintenance',
    // },
  ];
  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.employeesService.getAllEmployees().subscribe({
      next: (employees) => {
        console.log(employees);
        this.employees = employees;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
  deleteEmployee(id: string) {
    this.employeesService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.router.navigate(['']);
        this.employeesService.getAllEmployees().subscribe({
          next: (employees) => {
            console.log(employees);
            this.employees = employees;
          },
          error: (response) => {
            console.log(response);
          },
        });
        
      },
    });
  }
}
