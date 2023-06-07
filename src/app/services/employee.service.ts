import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  addEmployee(data:any):Observable<any> {
    return this._http.post('https://localhost:7018/api/Users',data);
   
    // return this._http.post('http://localhost:3000/employees',data);
  }
  editEmployee(id:number,data:any):Observable<any> {
    return this._http.put(`https://localhost:7018/api/Users/${id}`,data);
   
    // return this._http.put(`http://localhost:3000/employees/${id}`,data);
  }
  getEmployeeList():Observable<any> {
    //return this._http.get('http://localhost:3000/employees');
    return this._http.get('https://localhost:7018/api/Users');
  }

  deleteEmployee(id:number):Observable<any> {
    return this._http.delete(`https://localhost:7018/api/Users/${id}`);
    
    //return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}
