import { Component } from '@angular/core';
import { UpdateViewBase } from "app/modules/shared/models";
import { Audience } from "app/api/models";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AudienceService } from "app/api/services";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-audience-edit-view',
    templateUrl: './audience-edit-view.component.html',
    styleUrls: ['./audience-edit-view.component.scss']
})
export class AudienceEditViewComponent extends UpdateViewBase<Audience> {

    private readonly audienceId: number;

    public form: FormGroup = this.formBuilder.group({
        id: [''],
        corps: ['', [Validators.required, Validators.min(0),]],
        floor: ['', [Validators.required, Validators.min(0),]],
        room: ['', [Validators.required, Validators.min(0),]],
    });

    public onDeleteRedirect: any[] = ['/admin/audiences'];

    constructor(
        private audienceService: AudienceService,
        formBuilder: FormBuilder,
        router: Router,
        activatedRoute: ActivatedRoute,
        dialog: MatDialog
    ) {
        super(formBuilder, router, activatedRoute, dialog);

        this.audienceId = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
    }


    public getEntity(): Observable<Audience> {
        return this.audienceService.getAudience(this.audienceId);
    }

    public updateEntity(): Observable<Audience> {
        return this.audienceService.updateAudience(this.form.value);
    }

    public deleteEntity(): Observable<void> {
        return this.audienceService.deleteAudience(this.audienceId);
    }

}
