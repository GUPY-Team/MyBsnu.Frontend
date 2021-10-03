import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { EmptyPagedList, PagedList, Pagination } from 'app/core';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

export abstract class ListViewBase<T> {

    private refresh$ = new BehaviorSubject(null);

    protected pagination$ = new BehaviorSubject<Pagination>({ page: 1, pageSize: 10 });

    public abstract displayColumns: ReadonlyArray<string>;

    public pageSizes = [5, 10, 25, 100];

    public itemList$: Observable<PagedList<T>>;

    protected constructor() {
        this.itemList$ = combineLatest([this.refresh$, this.pagination$])
            .pipe(
                map(([_, pagination]) => pagination),
                switchMap(p => this.getList(p)),
                startWith(new EmptyPagedList<T>())
            );
    }

    protected abstract getList(pagination: Pagination): Observable<PagedList<T>>;

    public onPaginationChange(e: PageEvent): void {
        this.pagination$.next({ page: e.pageIndex + 1, pageSize: e.pageSize });
    }

    public refreshList(): void {
        this.refresh$.next(null);
    }
}
