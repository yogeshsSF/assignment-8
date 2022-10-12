import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { UserService } from 'src/app/user.service';
import {customer, Role} from '../../user.model';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @Output () updatedData = new EventEmitter();
  addUserForm: FormGroup;
  addButtonClicked = false;
  role = Role;
  customers: customer[];

  constructor(private userService: UserService,private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomer().subscribe(newData=>{
      this.customers = newData;
    });
    this.addUserForm = new FormGroup({
      'firstName': new FormControl(null,[Validators.required]),
      'middleName':new FormControl(''),
      'lastName':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'phoneNumber':new FormControl(null,[Validators.required]),
      'rid':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
      'cid':new FormControl(null,[Validators.required]),
      'address':new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
    if(this.addUserForm.status === "INVALID"){
      this.addButtonClicked = true;
      return;
    }
    else{
      this.addButtonClicked = false;
      this.userService.addUser(this.addUserForm.value).subscribe(responseData=>{
        this.addUserForm.reset();
        this.updatedData.emit();
      })
    }
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean}|null {
    if (control.value in this.role) {
      return null;
    }
    else{
      return {'roleIsForbidden': true};
    }
  }

}
