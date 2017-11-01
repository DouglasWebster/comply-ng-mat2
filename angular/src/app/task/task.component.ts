import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthManagerService, UtilityService } from '../services/index';
import { IProject, ITask, IUser } from '../interfaces/index';
import { AddPhotoComponent } from './add-photo/add-photo.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  project: IProject;
  task: ITask;
  comment: String;
  projectId: string;
  taskId: string;
  taskUser: string;
  users: Array<IUser>;
  userPhoto: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authManager: AuthManagerService,
    private utility: UtilityService,
    private photoDlg: MatDialog
  ) {
    this.users = [];
    this.project = { _id: '', name: '', description: '', owner: <IUser>{}, users: [], tasks: [], permalink: '' };
    this.task = { _id: '', name: '', description: '', owner: null, assignedTo: { name: {} }, users: [], history: [], permalink: '' };
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    this.getTask(this.taskId);
    this.getUsers();
  }

  getTask(taskId) {
    this.utility.makeGetRequest('/api/task/get', [taskId]).then(
      (result: any) => {
        this.task = <ITask>result.task;
        this.getProject(result.projectId);
      },
      error => {
        console.error(error);
      });
  }

  getProject(projectId: string) {
    this.utility.makeGetRequest('/api/project/get', [projectId]).then(
      result => {
        this.project = <IProject>result;
      },
      error => {
        console.log(error);
      });
  }

  reply(comment: String) {
    if (comment && comment !== '') {
      this.utility.makePostRequest('/api/task/addHistory', [],
        { log: comment, userId: this.authManager.getAuthToken(), taskId: this.taskId }).then(
        result => {
          this.task.history.unshift(result);
        },
        error => {
          console.error(error);
        });
    }
    this.comment = '';
  }

  public doNewPhoto() {
    const registerDlgRef = this.photoDlg.open(AddPhotoComponent, { data: { taskId: this.taskId }, width: '450px' });
    registerDlgRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.task.history.unshift(result);
        } else {
          console.log('New photo not stored');
        }
      });
  }

  fileEventUpload(photo: any) {
    this.userPhoto = photo.target.files[0];
  }

  addUser(taskUser: string) {
    if (taskUser && taskUser !== '') {
      this.utility.makePostRequest('/api/task/addUser', [], { email: taskUser, taskId: this.taskId }).then(
        result => {
          this.task.users.unshift(<IUser>result);
        },
        error => {
          console.error(error);
        });
      this.taskUser = '';
    }
  }

  getUsers() {
    this.utility.makeGetRequest('/api/user/getAll', []).then(
      result => {
        this.users = <Array<IUser>>result;
      },
      error => {
        console.error(error);
      });
  }

  change(event) {
    this.utility.makePostRequest('/api/task/assignUser', [], { userId: event.value, taskId: this.taskId }).then(
      result => {
        console.log(<IUser>result);
      },
      error => {
        console.error(error);
      });
  }

  parseDate(date: string) {
    const d: Date = new Date(date);
    const fullMonth = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return fullMonth[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' @ ' + d.toLocaleTimeString();
  }
}
