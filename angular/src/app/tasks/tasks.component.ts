import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { MatDialog, MatDialogRef } from '@angular/material';

import { AuthManagerService, UtilityService } from '../services/index';
import { IProject, ITask, IUser } from '../interfaces/index';
import { NewTaskComponent } from './new-task/new-task.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  users: Array<IUser>;
  project: IProject;
  projectId: string;
  projectUser: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authManager: AuthManagerService,
    private utility: UtilityService,
    private taskDlg: MatDialog
  ) {
    this.project = { _id: '', name: '', description: '', owner: <IUser>{}, users: [], tasks: null, permalink: '' };

  }

  getUsers() {
    this.utility.makeGetRequest('/api/user/getAll', []).then((result) => {
      this.users = <Array<IUser>>result;
    }, (error) => {
      console.log(error);
    });
  }

  getProject(projectId: string) {
    this.utility.makeGetRequest('/api/project/get', [projectId]).then((result) => {
      this.project = <IProject>result;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.getProject(this.projectId);
    this.getUsers();
  }

  public doNewTask() {
    const registerDlgRef = this.taskDlg.open(NewTaskComponent,
      {
        data: { projectId: this.projectId, assignees: this.users },
        width: '450px'
      });
    registerDlgRef.afterClosed().subscribe(result => {
      console.log('Register Dialog returned', result);
      if (result === '') {
        console.log('New task not registerd');
      } else {
        this.project.tasks.push(result);
      }
    });
  }

  /**
   * doNewUser
   */
  public doNewUser(newUser: string) {
    if (newUser && newUser !== '') {
      this.utility.makePostRequest('/api/project/addUser', [], { email: newUser, projectId: this.project._id }).then((result) => {
        this.project.users.unshift(result);
      }, (error) => {
        console.error(error);
      });
      this.projectUser = '';
    }

  }
}
