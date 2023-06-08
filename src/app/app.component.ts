import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
import {MatSnackBar,MatSnackBarDismiss,MatSnackBarHorizontalPosition,MatSnackBarModule,MatSnackBarRef,MatSnackBarVerticalPosition, TextOnlySnackBar,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experiance',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

horizontalPosition: MatSnackBarHorizontalPosition = 'center';
verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private _dialog: MatDialog,
     private _empService: EmployeeService,
     private _coreService: CoreService,
     public dialog: MatDialog,
     private _snackBar: MatSnackBar
     ){}

     openSnackBar(id:number) {
      let mySnackBar: MatSnackBarRef<TextOnlySnackBar> = this._snackBar.open('Delete Employee!!', 'Delete',{
        duration:8000
      });
      mySnackBar.afterDismissed().subscribe((matSnackBarDismiss: MatSnackBarDismiss) => {
        console.log('afterDismissed');
      });
      mySnackBar.onAction().subscribe(() => {
        console.log('onAction');
        this.deleteEmployee(id);
        mySnackBar.dismiss();
      });
      mySnackBar.afterOpened().subscribe(() => {
        console.log('afterOpened');
      });
      // this._snackBar.open('Delete Employee!!', ' this.deleteEmployee(id)', {
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      // });
     
    }

  ngOnInit(): void {
      this.getEmployeeList();
  }

  openAddEditEmpForm() {
   const dialogRef=  this._dialog.open(EmpAddEditComponent);
   dialogRef.afterClosed().subscribe({
    next: (val)=> {
      if(val){
        this.getEmployeeList();
      }
    }
   })
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort =this.sort;
          this.dataSource.paginator =this.paginator;
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number) {
   
    this._empService.deleteEmployee(id).subscribe({
      next: (res)=> {
        this._coreService.openSnackBar('Employee deleted successfully','');
        this.getEmployeeList();
      },
      error: (err)=> {
        alert('Error deleting employee');
      }
    })
  }

  openEditEmpForm(data:any) {
    const dialogRef=this._dialog.open(EmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=> {
        if(val){
          this.getEmployeeList();
        }
      }
     })

   }
}
