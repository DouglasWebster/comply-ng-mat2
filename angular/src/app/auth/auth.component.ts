import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material';
import 'rxjs/add/operator/filter';

import { AuthManagerService } from '../services/auth-manager.service';
import { UtilityService } from '../services/utility.service';
import { ICompany, IUser } from '../interfaces/index';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  loginWarning = '';
  userCompany: string;
  companies: Array<ICompany>;

  constructor(
    private router: Router,
    private utility: UtilityService,
    private authManager: AuthManagerService,
    private fb: FormBuilder,
    private registerDlg: MatDialog
  ) {
    this.companies = [];
    this.userCompany = '';
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.utility.makeGetRequest('/api/company/getAll', []).then((result) => {
      this.companies = <Array<ICompany>>result;
    }, (error) => {
      console.error(error);
    });

  }

  public login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (!email || email === '') {
      console.error('Email must exist');
    } else if (!password || password === '') {
      console.error('Password must exist');
    } else {
      this.authManager.login(email, password).then((result) => {
        this.router.navigate(['/']);
      }, (error) => {
        console.error(error);
      });
    }
  }

  public doNewUser() {
    this.loginWarning = '';
    const registerDlgRef = this.registerDlg.open(NewUserComponent, { width: '450px' });
    registerDlgRef.afterClosed()
      .filter(x => !!x)
      .subscribe(result => {
        console.log('Register Dialog returned', result);
        if (result === '') {
          this.loginWarning = 'New User not registerd';
        }
        this.loginForm.setValue({
          email: result,
          password: ''
        });
      });
  }
}
