import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { UtilityService, AuthManagerService } from '../../services/index';

import { ICompany } from '../../interfaces/index';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {

  companyForm: FormGroup;
  loading = false;
  companyFailure = '';
  newCompany: ICompany;

  constructor(
    private utility: UtilityService,
    private authManager: AuthManagerService,
    private fb: FormBuilder,
    private dlgRef: MatDialogRef<NewCompanyComponent>
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required]
    });

  }

  doNewCompany() {
    const formModel = this.companyForm.value;
    this.utility.makePostRequest('/api/company/create', [], {
      name: formModel.name,
      address: {
        street: formModel.street,
        city: formModel.city,
        state: formModel.state,
        country: formModel.country,
        zip: formModel.zip
      },
      phone: formModel.phone,
      website: formModel.website
    }).then((result) => {
      console.log(`Create Company result ${result}`);
      this.dlgRef.close(result);
    },
      error => {
        console.error(error);
        this.companyFailure = 'Error registering new company';
        this.loading = false;
      });
  }

}
