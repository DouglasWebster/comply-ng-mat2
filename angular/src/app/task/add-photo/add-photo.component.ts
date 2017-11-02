import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FileValidators } from '../../helpers/file-validators';

import { UtilityService, AuthManagerService } from '../../services/index';

import { IProject, ITask, IUser } from '../../interfaces/index';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  photoForm: FormGroup;
  photoFailure = '';
  loading = false;
  taskId: string;
  users: Array<IUser>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public projectId: any,
    private utility: UtilityService,
    private authManager: AuthManagerService,
    private fb: FormBuilder,
    private dlgRef: MatDialogRef<AddPhotoComponent>
  ) {
    this.createForm();
  }

  private createForm() {
    this.photoForm = this.fb.group({
      description: ['', Validators.required],
      fileSelect: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  savePhoto() {
    this.loading = true;
    const formModel = this.photoForm.value;
    const userPhoto = formModel.fileSelect;
    const description = formModel.description;

    this.utility.makeFileRequest('/api/cdn/add', [], userPhoto, description, this.authManager.getAuthToken(), this.taskId)
      .then(result => {
        this.dlgRef.close(result);
      }, error => {
        console.error(error);
      });
  }
}
