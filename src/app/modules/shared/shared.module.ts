import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/modules/material/material.module';
import { ConfirmDialogComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    exports: [
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
        ConfirmDialogComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule {
}
