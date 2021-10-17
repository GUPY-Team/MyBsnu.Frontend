import { Component } from '@angular/core';
import { CreateViewBase } from 'app/modules/shared/models';
import { Audience } from 'app/api/models';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AudienceService } from 'app/api/services';

@Component({
    selector: 'app-audience-create-view',
    templateUrl: './audience-create-view.component.html',
    styleUrls: ['./audience-create-view.component.scss']
})
export class AudienceCreateViewComponent extends CreateViewBase<Audience> {

    public form: FormGroup = this.formBuilder.group({
        corps: ['', [Validators.required, Validators.min(0),]],
        floor: ['', [Validators.required, Validators.min(0),]],
        room: ['', [Validators.required, Validators.min(0),]],
    });

    public onSubmitRedirect: any[] = ['/admin/audiences'];

    constructor(
        private audienceService: AudienceService,
        formBuilder: FormBuilder,
        router: Router
    ) {
        super(formBuilder, router);
    }

    public createEntity(): Observable<Audience> {
        return this.audienceService.createAudience(this.form.value);
    }

}
