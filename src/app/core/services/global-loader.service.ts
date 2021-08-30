import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GlobalLoaderService {

    public _pendingRequests = new BehaviorSubject(0);

    public loading$ = this._pendingRequests.asObservable()
        .pipe(
            map(num => num !== 0),
            switchMap(loading => of(loading).pipe(delay(300))),
        );

    public incrementRequestsCount(): void {
        this._pendingRequests.next(this._pendingRequests.value + 1);
    }

    public decrementRequestsCount(): void {
        this._pendingRequests.next(this._pendingRequests.value - 1);
    }
}
