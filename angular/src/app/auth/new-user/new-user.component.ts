import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { UtilityService, AuthManagerService } from '../../services/index';

import { IUser, ICompany } from '../../interfaces/index';

@Component({
  selector: 'app-register',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  registerForm: FormGroup;
  newUser: IUser;
  loading = false;
  registerFailure = '';
  companies: Array<ICompany>;

  constructor(
    private utility: UtilityService,
    private authManager: AuthManagerService,
    private fb: FormBuilder,
    private dlgRef: MatDialogRef<NewUserComponent>
  ) {
    this.createForm();
  }

  private createForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      company: ['', Validators.required]
    });
  }

  private prepareModel() {
    const formModel = this.registerForm.value;
    this.newUser = {
      name: {
        first: formModel.firstName,
        last: formModel.lastName
      },
      address: {
        street: formModel.street,
        city: formModel.city,
        state: formModel.state,
        zip: formModel.zip,
        country: formModel.country
      },
      email: formModel.email,
      phone: formModel.phone,
      password: formModel.password,
      company: formModel.company
    };
  }

  ngOnInit() {
    this.utility.makeGetRequest('/api/company/getAll', []).then((result) => {
      this.companies = <Array<ICompany>>result;
    }, (error) => {
      console.error(error);
    });

  }

  public register() {
    this.loading = true;
    this.prepareModel();
    this.authManager.register(this.newUser).then(
      result => {
        console.log(`registering ${this.newUser.email} returned ${this.newUser}`);
        this.dlgRef.close(this.newUser.email);
      },
      error => {
        console.error(error);
        this.registerFailure = 'Error Registering New User';
        this.loading = false;
      }
    );
  }

}
