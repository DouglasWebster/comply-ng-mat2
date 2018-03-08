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
    MatSidenavModule,
    MatSortModule,
    MatProgressSpinnerModule
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
        MatSidenavModule,
        MatSortModule,
        MatProgressSpinnerModule
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
        MatSidenavModule,
        MatSortModule,
        MatProgressSpinnerModule
    ]
})
export class ComplyMaterialModule { }
