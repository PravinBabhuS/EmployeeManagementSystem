import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };
  constructor(
    private employeeService: EmployeesService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  addEmployee() {
    console.log(this.addEmployeeRequest);
    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employees) => {
        this.router.navigate(['']);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
