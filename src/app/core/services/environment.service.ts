import { Inject, Injectable, Optional } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>('environment');

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    private readonly environment: any;

    constructor(@Optional() @Inject(ENVIRONMENT) environment: any) {
        this.environment = environment ?? {};
    }

    public getValue<TValue>(key: string, defaultValue?: TValue): TValue {
        return this.environment[key] ?? defaultValue;
    }
}
