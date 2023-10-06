// Import necessary modules and components
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee'; // Employee class
import { EmployeeService } from './employee.service'; // Employee service to handle API requests
import { HttpErrorResponse } from '@angular/common/http'; // Module for handling HTTP errors
import { NgForm } from '@angular/forms'; // Module for handling forms

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public employees: Employee[] | undefined | null; // Array of Employee objects
  public editEmployee: Employee | undefined | null; // Employee object for editing
  public deleteEmployee: Employee | undefined | null; // Employee object for deletion

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees(); // Call method to retrieve all employees from the server
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response; // Assign the retrieved employees to the component's employees array
        console.log(this.employees); // Log the employees array to the console
      },
      (error: HttpErrorResponse) => {
        alert(error.message); // Display an alert message if an error occurs
      }
    );
  }
  

  public onOpenModal(employee: Employee | null, mode: string): void {
    // Method to handle modal window for adding, editing or deleting an employee
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee; // Assign the employee to be edited to the editEmployee object
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee; // Assign the employee to be deleted to the deleteEmployee object
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if(container){
      container.appendChild(button);
    }
    button.click();
  }


  public onAddEmloyee(addForm: NgForm): void {
    // Method to handle the addition of a new employee
    const addEmployeeForm = document.getElementById('add-employee-form');
    if (addEmployeeForm) {
      addEmployeeForm.click();
    }
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees(); // Retrieve all employees after adding a new one
        addForm.reset(); // Reset the form after successful addition
      },
      (error: HttpErrorResponse) => {
        alert(error.message); // Display an alert message if an error occurs
        addForm.reset(); // Reset the form after error
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    // Method to handle updating an existing employee
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees(); // Retrieve all employees after updating one
      },
      (error: HttpErrorResponse) => {
        alert(error.message); // Display an alert message if an error occurs
      }
    );
  }

  public onDeleteEmloyee(employeeId: number | undefined): void {
    // Method to handle deleting an existing employee
    if(employeeId === undefined){
      return;
    }
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees(); // Retrieve all employees after deleting one
      },
      (error: HttpErrorResponse) => {
        alert(error.message); // Display an alert message if an error occurs
      }
    );
  }

  public searchEmployees(key: string): void {
    // Method to search for employees based on a keyword
    console.log(key);
    if (!this.employees) {
      return;
    }
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee); // Add the matching employees to the results array
      }
    }
    this.employees = results; // Replace the component's employees array with the results array
    if (results.length === 0 || !key) {
      this.getEmployees(); // Retrieve all employees if the keyword is empty or no results are found
    }
  }

}

