import {Inject, Injectable, Optional} from "@angular/core";
import {ENVIRONMENT} from "./environment.token";

@Injectable({
    providedIn: "root"
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
