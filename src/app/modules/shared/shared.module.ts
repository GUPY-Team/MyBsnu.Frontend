import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/modules/material/material.module';
import { ConfirmDialogComponent, SelectListComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizedPaginator } from 'app/modules/shared/models';
import { MatPaginatorIntl } from '@angular/material/paginator';


@NgModule({
    declarations: [
        ConfirmDialogComponent,
        SelectListComponent
    ],
    exports: [
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
        ConfirmDialogComponent,
        SelectListComponent,
        FormsModule,
        CommonModule,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: LocalizedPaginator }
    ]
})
export class SharedModule {
}
