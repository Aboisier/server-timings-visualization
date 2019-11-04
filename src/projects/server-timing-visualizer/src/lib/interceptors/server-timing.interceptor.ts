import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Metric } from '../models/metric.model';
import { ServerTiming } from '../models/server-timing.model';
import { ServerTimingVisualizerService } from '../services/server-timing-visualizer.service';

@Injectable()
export class ServerTimingInterceptor implements HttpInterceptor {
    constructor(private service: ServerTimingVisualizerService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (!evt.headers.has('Server-Timing')) return;

                    const splitMetrics = evt.headers.get('Server-Timing').split(',');
                    const metrics: Metric[] = [];
                    for (const m of splitMetrics) {
                        const parts = m.split(';');
                        const metric = {} as Metric;
                        for (const part of parts) {
                            if (part.startsWith('desc=')) {
                                metric.description = part.substring('desc='.length);
                            } else if (part.startsWith('dur=')) {
                                metric.timing = +part.substring('dur='.length);
                            } else {
                                metric.name = part;
                            }
                        }

                        metrics.push(metric);
                    }

                    const timing = {
                        duration: metrics.map(x => x.timing).reduce((p, c) => (p != null ? p : 0) + (c != null ? c : 0)),
                        metrics: metrics,
                        request: evt.url,
                        timestamp: Date.now()
                    } as ServerTiming;
                    this.service.addTiming(timing);
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    console.log('error ');
                }
                return of(err);
            }));
    }
}
