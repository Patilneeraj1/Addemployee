import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule} from '@angular/forms'
import { EmployeeModel } from './employee-dashboard-model';
import { ApiService } from '../sharedservice/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})

export class EmployeeDashboardComponent implements OnInit {
  formvalue !: FormGroup;
  employeemodelobj : EmployeeModel= new EmployeeModel;
  employeedata !: any
row: any;
editedData: any;
saveData: EventEmitter<any> = new EventEmitter();
  

  //this is to bind the data from the user the data which ever he has entered
  constructor(private formbuilder: FormBuilder, private api : ApiService ){}
  
  //for using this initialization in .html file the formcontrolName is used 
  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getallemployeedetails();
    
  }

  //this is were we will add the data to the json server usin the apiservice
  //we have created employee-dashboard-nodel.ts file where we have exported the class with the empty variables
  getallemployeedetails(){
    this.api.getemployee().subscribe(res=>{
      this.employeedata = res;

    })
  }
  
  postEmployeeDetails(){
    this.employeemodelobj.firstName = this.formvalue.value.firstName;
    this.employeemodelobj.lastName = this.formvalue.value.lastName;
    this.employeemodelobj.email = this.formvalue.value.email;
    this.employeemodelobj.mobile = this.formvalue.value.mobile;
    this.employeemodelobj.salary = this.formvalue.value.salary;

    this.api.postemployee(this.employeemodelobj).subscribe(res=>{

      console.log(res);
      console.log("Employee added")
      let cls = document.getElementById("cancel")
      cls?.click();
      this.formvalue.reset();
      this.getallemployeedetails();
    },
    err=>{
    alert("error occured")
    })
  }

  //delete function
  deleteEmployee(row: any) {
    this.api.deleteemployee(row.id).subscribe(
      (res => {
        alert('Deletion complete');
        this.getallemployeedetails();
        
      }),
      (err) => {
        console.error('Error during deletion', err);
        alert('Error occurred during deletion');
      }
    );
  }

  
  saveit(rowobj: any) {
    this.api.updateemployee(rowobj.id, rowobj).subscribe((res: any) => {
      console.log("updated successfully", res);
      this.getallemployeedetails();
      rowobj.isEdit = false; // Disable the edit function
    }, (err: any) => {
      console.error("Update failed", err);
    });
  }
  
  editedRow: any;
  onEdit(row: any) {
    this.editedRow = { ...row };
    this.formvalue.patchValue(this.editedRow);
  }

   // Function to save the edited data
   saveEdit() {
    const updatedData = this.formvalue.value;
    this.api.updateemployee(this.editedRow.id, updatedData).subscribe(
      (res: any) => {
        console.log("Updated successfully", res);
        this.getallemployeedetails();
        let cls = document.getElementById("cancel")
        cls?.click();
      },
      (err: any) => {
        console.error("Update failed", err);
      }
    );
  }
}