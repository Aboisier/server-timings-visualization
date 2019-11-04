import { Metric } from "./metric.model";
import { HttpEventType } from "@angular/common/http";

export interface ServerTiming {
    timestamp: number;
    request?: string;
    type?: string;
    duration?: number;
    metrics: Metric[];
}