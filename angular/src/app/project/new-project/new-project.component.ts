import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { UtilityService, AuthManagerService } from '../../services/index';

import { IProject } from '../../interfaces/index';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  projectForm: FormGroup;
  newProject: IProject;
  loading = false;
  projectFailure = '';
  projects: Array<IProject>;

  constructor(
    private utility: UtilityService,
    private authManager: AuthManagerService,
    private fb: FormBuilder,
    private dlgRef: MatDialogRef<NewProjectComponent>
  ) {
    this.createForm();
  }

  private createForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  private prepareModel() {
    const formModel = this.projectForm.value;
    this.newProject = {
      name: formModel.name,
      description: formModel.description,
      permalink: '',
      owner: this.authManager.getAuthToken(),
      users: [],
      tasks: []
    };
  }

  public createProject() {
    this.loading = true;
    this.prepareModel();
    this.utility.makePostRequest('/api/project/create', [], this.newProject).
      then(result => {
        console.log(`Create Project result ${result}`);
        this.dlgRef.close(result);
      },
      error => {
        console.error(error);
        this.projectFailure = 'Error Creating New Project';
        this.loading = false;
      });
  }
}
