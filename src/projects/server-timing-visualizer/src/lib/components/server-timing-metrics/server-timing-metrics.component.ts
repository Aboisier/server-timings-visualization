import { Component, OnInit } from '@angular/core';
import { ServerTiming } from '../../models/server-timing.model';
import { ServerTimingConfig } from '../../services/server-timing-config.service';

@Component({
    selector: 'lib-server-timing-metrics',
    templateUrl: 'server-timing-metrics.component.html',
    styleUrls: ['server-timing-metrics.component.css']
})

export class ServerTimingMetricsComponent implements OnInit {

    public timings: ServerTiming[] = [];
    constructor(private serverTimingConfig: ServerTimingConfig) { }

    ngOnInit() { }

    public addTiming(timing: ServerTiming) {
        this.timings.push(timing);
        if (this.timings.length > this.serverTimingConfig.maxDisplayedRequest) {
            this.timings.splice(0, 1);
        }
    }

    public clear() {
        this.timings = [];
    }
}