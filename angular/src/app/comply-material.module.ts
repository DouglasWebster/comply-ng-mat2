import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [
    ],
    imports: [
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatTableModule,
        MatSortModule
    ],
    exports: [
        FlexLayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatTableModule,
        MatSortModule
    ]
})
export class ComplyMaterialModule { }
