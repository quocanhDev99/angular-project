import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../services/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fullname: [''],
      email: [''],
      phone: [''],
      salary: [''],
    });
    this.getEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  // Add Employee
  postEmployeeDetails() {
    this.employeeModelObj.fullname = this.formValue.value.fullname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee added successfully!");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getEmployee();
      }, err => {
        alert("Something went wrong!");
      });
  }

  // Get All Employee
  getEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      });
  }

  // Delete Employee
  deleteEmployeeDetails(employee: any) {
    this.api.deleteEmployee(employee.id)
      .subscribe(res => {
        alert("Employee deleted!");
        this.getEmployee();
      });
  }

  //Update Employee
  onEdit(employee: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = employee.id;
    this.formValue.controls['fullname'].setValue(employee.fullname);
    this.formValue.controls['email'].setValue(employee.email);
    this.formValue.controls['phone'].setValue(employee.phone);
    this.formValue.controls['salary'].setValue(employee.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.fullname = this.formValue.value.fullname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        alert("Updated Successfully!");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getEmployee();
      })
  }
}
