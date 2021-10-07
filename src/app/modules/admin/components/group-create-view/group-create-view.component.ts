import { Component } from '@angular/core';
import { CreateViewBase } from 'app/modules/shared/models';
import { Group } from 'app/api/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GroupService } from 'app/api/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-group-create-view',
    templateUrl: './group-create-view.component.html',
    styleUrls: ['./group-create-view.component.scss']
})
export class GroupCreateViewComponent extends CreateViewBase<Group> {

    public form: FormGroup = this.formBuilder.group({
        number: ['', [Validators.required, Validators.maxLength(256)]]
    });

    public onSubmitRedirect: any[] = ['admin/groups'];

    constructor(
        private groupService: GroupService,
        formBuilder: FormBuilder,
        router: Router
    ) {
        super(formBuilder, router);
    }

    createEntity(): Observable<Group> {
        return this.groupService.createGroup(this.form.value);
    }
}
