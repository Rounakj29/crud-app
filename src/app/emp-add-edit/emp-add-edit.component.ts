import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import {Inject} from '@angular/core';
import { CoreService } from '../core/core.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education:string[]=[
    '',
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post-Graduate'
  ];

  minDate: Date;
  maxDate: Date;


  constructor(
    private _fb:FormBuilder,
     private _empService: EmployeeService,
     private _dialogRef: MatDialogRef<EmpAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public  data:any,
     private _coreService: CoreService
    ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: ['',[Validators.required,Validators.email]],
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date();

  }

  ngOnInit():void{
    this.empForm.patchValue(this.data);
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onFormSubmit(){
    if(this.empForm.valid){
     if(this.data){
      this._empService.editEmployee(this.data.id,this.empForm.value).subscribe({
        next: (val:any) => {
          this._coreService.openSnackBar('Employee Details Updated!',''); //
          this._dialogRef.close(true);
        },
        error: (err:any) => {
          console.error("Error Updating employee",err);
        },
      })
     }
      else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val:any) => {
          this._coreService.openSnackBar('Employee Added!',''); //
          this._dialogRef.close(true);
        },
        error: (err:any) => {
          console.error("Error adding employee",err);
        },
      })
    }
  }
}
}
