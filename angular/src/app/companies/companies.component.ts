import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MatSort } from '@angular/material';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { AuthManagerService, UtilityService } from '../services/index';
import { ICompany } from '../interfaces/index';
import { NewCompanyComponent } from './new-company/new-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  displayedColumns = ['name', 'city', 'state', 'website'];
  dataSource: CompaniesDataSource | null;
  dataSubject: BehaviorSubject<ICompany[]> = new BehaviorSubject<ICompany[]>([]);
  companies: ICompany[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authManager: AuthManagerService,
    private utility: UtilityService,
    private companyDlg: MatDialog
  ) {
    this.utility.makeGetRequest('/api/company/getAll', []).then((result) => {
      this.companies = <ICompany[]>result;
      this.dataSubject.next(this.companies);
      this.sort.active = 'name';
      this.sort.direction = 'asc';
      this.dataSource = new CompaniesDataSource(this.dataSubject, this.sort);
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit() {
  }

  doNewCompany() {
    const registerDlgRef = this.companyDlg.open(NewCompanyComponent, { width: '450px' });
    registerDlgRef.afterClosed().subscribe(
      result => {
        console.log('New Comapny Dialog returned', result);
        if (result === '') {
          console.log('New Project not registerd');
        } else {
          this.companies.push(result);
          this.dataSubject.next(this.companies);
        }
      }
    );
  }

}

export class CompaniesDataSource extends DataSource<any> {

  constructor(private _subject: BehaviorSubject<ICompany[]>, private _sort: MatSort) {
    super();
  }

  connect(): Observable<ICompany[]> {
    const displayDataChanges = [
      this._subject.value,
      this._sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });

  }

  disconnect(): void { }

  getSortedData(): ICompany[] {
    const data = this._subject.value;
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'city': [propertyA, propertyB] = [a.address.city, b.address.city]; break;
        case 'state': [propertyA, propertyB] = [a.address.state, b.address.state]; break;
        case 'website': [propertyA, propertyB] = [a.website, b.website]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

}
