import { Component } from '@angular/core';
import { UpdateViewBase } from 'app/modules/shared/models';
import { Group } from 'app/api/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GroupService } from 'app/api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-group-edit-view',
    templateUrl: './group-edit-view.component.html',
    styleUrls: ['./group-edit-view.component.scss']
})
export class GroupEditViewComponent extends UpdateViewBase<Group> {

    public form: FormGroup = this.formBuilder.group({
        id: ['', [Validators.required]],
        number: ['', [Validators.required, Validators.maxLength(256)]]
    });
    public onDeleteRedirect: any[] = ['admin/groups'];
    private readonly groupId: number;

    constructor(
        private groupService: GroupService,
        formBuilder: FormBuilder,
        router: Router,
        activatedRoute: ActivatedRoute,
        dialog: MatDialog
    ) {
        super(formBuilder, router, activatedRoute, dialog);

        this.groupId = Number(this.activatedRoute.snapshot.paramMap.get('id'))!;
    }

    getEntity(): Observable<Group> {
        return this.groupService.getGroup(this.groupId);
    }

    updateEntity(): Observable<Group> {
        return this.groupService.editGroup(this.form.value);
    }

    deleteEntity(): Observable<void> {
        return this.groupService.deleteGroup(this.groupId);
    }
}
