import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //API server base URL
  private apiServerUrl = environment.apiBaseUrl;

  //Inject HTTPClientin the constructor
  constructor(private http: HttpClient) { }

  //Method to get all employees from the API server
  public getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`)
  }

  //Method to add new employee to the API server
  public addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  // Method to update an existing employee's details on the API server
  public updateEmployee(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

    // Method to delete an existing employee from the API server
    public deleteEmployee(employeeId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
    }

}
