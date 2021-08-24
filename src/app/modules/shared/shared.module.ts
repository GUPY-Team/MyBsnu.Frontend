import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components';
import { MaterialModule } from 'app/modules/material/material.module';


@NgModule({
    declarations: [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class SharedModule {
}
