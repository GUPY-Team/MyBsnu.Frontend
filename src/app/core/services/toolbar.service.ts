import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ToolbarService {

    private _loading = new BehaviorSubject(false);

    public loading$ = this._loading.asObservable().pipe(debounceTime(150));

    public setLoading(loading: boolean): void {
        this._loading.next(loading);
    }
}
