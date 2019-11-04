import { Injectable } from '@angular/core';

@Injectable()
export class ServerTimingConfig {
    enabled: boolean = true;
    maxDisplayedRequest: number = 15;
}