import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
    title?: string;
    message?: string;
    okButtonText?: string;
    cancelButtonText?: string;
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    public title: string = 'CONFIRM_DIALOG.DEFAULT_TITLE';
    public message: string = 'CONFIRM_DIALOG.DEFAULT_MESSAGE';
    public okButtonText: string = 'CONFIRM_DIALOG.DEFAULT_OK';
    public cancelButtonText: string = 'CONFIRM_DIALOG.DEFAULT_CANCEL';

    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogData,
    ) {
    }

    public ngOnInit(): void {
        const data = this.data;

        this.title = data?.title ?? this.title;
        this.message = data?.message ?? this.message;
        this.okButtonText = data?.okButtonText ?? this.okButtonText;
        this.cancelButtonText = data?.cancelButtonText ?? this.cancelButtonText;
    }

}
