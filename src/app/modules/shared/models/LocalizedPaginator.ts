import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LocalizedPaginator implements MatPaginatorIntl {
    changes = new Subject<void>();


    firstPageLabel = this.translateService.instant('PAGINATOR.FIRST_PAGE');
    itemsPerPageLabel = this.translateService.instant('PAGINATOR.ITEMS_PER_PAGE');
    lastPageLabel = this.translateService.instant('PAGINATOR.LAST_PAGE');

    nextPageLabel = this.translateService.instant('PAGINATOR.NEXT_PAGE');
    previousPageLabel = this.translateService.instant('PAGINATOR.PREVIOUS_PAGE');

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return this.translateService.instant('PAGINATOR.PAGE_X_OF_Y', { x: page + 1, y: 1 });
        }
        const amountPages = Math.ceil(length / pageSize);
        return this.translateService.instant('PAGINATOR.PAGE_X_OF_Y', { x: page + 1, y: amountPages });
    }

    constructor(
        private translateService: TranslateService
    ) {
    }
}
