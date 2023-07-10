import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
empsFrom : FormGroup;


education:string[]=[
  'Matric',
  'Diploma',
  'Intermediate',
  'Graduate',
  'Post Graduate',
];
constructor(
  
  private _fb: FormBuilder, 
  private _empService : EmployeeService,
  private _dialogRef :MatDialogRef<EmpAddEditComponent>,
  private _coreService:CoreService,
  @Inject(MAT_DIALOG_DATA) public data: any

  ){
  this.empsFrom=this._fb.group({
    firstName : '',
    lastName : '',
    email : '',
    date : '',
    gender : '',
    education : '',
    company : '',
    experience : '',
    package : '',

  });
  
}

ngOnInit(): void {
  this.empsFrom.patchValue(this.data);
}

onFormSubmit() {
  if (this.empsFrom.valid){
    if (this.data){
      this._empService.updateEmployee(this.data.id,this.empsFrom.value).subscribe({
        next:(val : any) => {
          
          this._coreService.openSnackBar('Employee updated','done');
          this._dialogRef.close(true);  
          
        },
        error:(err) => {
          console.error(err);
        }
      })
    }else {
         this._empService.addEmployee(this.empsFrom.value).subscribe({
      next:(val : any) => {
        
        this._coreService.openSnackBar('Employee added');
        this._dialogRef.close(true);  
        this._empService.getEmployeeList();
      },
      error:(err) => {
        console.error(err);
      }
    })
    }
 
  }

}

}
