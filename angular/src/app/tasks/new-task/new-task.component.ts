import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IUser } from '../../interfaces/index';

import { UtilityService, AuthManagerService } from '../../services/index';

import { IProject, ITask } from '../../interfaces/index';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  taskForm: FormGroup;
  projectId: string;
  assignees: Array<IUser>;
  newTask: ITask;
  loading = false;
  taskFailure = '';

  constructor(
   @Inject(MAT_DIALOG_DATA) public data: any,
  private utility: UtilityService,
  private authManager: AuthManagerService,
  private fb: FormBuilder,
  private dlgRef: MatDialogRef<NewTaskComponent>
  ) {
  this.createForm();
  this.projectId = data.projectId;
  this.assignees = data.assignees;
  console.log('projectId: ', this.projectId);
  console.log('assignees: ', this.assignees);
}

  private createForm() {
  this.taskForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    assignedTo: ['', Validators.required]
  });
}

ngOnInit() {
}

  private prepareModel() {
  const formModel = this.taskForm.value;
  this.newTask = {
    name: formModel.name,
    description: formModel.description,
    owner: this.authManager.getAuthToken(),
    assignedTo: formModel.assignedTo,
    users: [],
    history: [],
    permalink: ''
  };
}

createTask() {
  this.loading = true;
  this.prepareModel();
  this.utility.makePostRequest('/api/task/create', [this.projectId], this.newTask).
    then((result) => {
      console.log(`Create Project result ${result}`);
      this.dlgRef.close(result);
    }, (error) => {
      console.error(error);
      this.taskFailure = 'Error Creating New Project';
      this.loading = false;
    });
}
}
