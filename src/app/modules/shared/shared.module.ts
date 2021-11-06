import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/modules/material/material.module';
import { ConfirmDialogComponent, MatErrorMessageComponent, SelectListComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizedPaginator } from 'app/modules/shared/models';
import { MatPaginatorIntl } from '@angular/material/paginator';


@NgModule({
    declarations: [
        ConfirmDialogComponent,
        SelectListComponent,
        MatErrorMessageComponent
    ],
    exports: [
        ConfirmDialogComponent,
        SelectListComponent,
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MatErrorMessageComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: LocalizedPaginator }
    ]
})
export class SharedModule {
}
