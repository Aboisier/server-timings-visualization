import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ServerTimingMetricComponent } from './components/server-timing-metric/server-timing-metric.component';
import { ServerTimingMetricsComponent } from './components/server-timing-metrics/server-timing-metrics.component';
import { ServerTimingInterceptor } from './interceptors/server-timing.interceptor';
import { ServerTimingConfig } from './services/server-timing-config.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ServerTimingMetricsComponent, ServerTimingMetricComponent],
  entryComponents: [ServerTimingMetricsComponent],
  exports: []
})
export class ServerTimingVisualizerModule {
  static forRoot(config: ServerTimingConfig): ModuleWithProviders {
    return {
      ngModule: ServerTimingVisualizerModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ServerTimingInterceptor, multi: true },
        { provide: ServerTimingConfig, useValue: config }
      ]
    };
  }
}
