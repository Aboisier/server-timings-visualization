import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { ServerTimingMetricsComponent } from '../components/server-timing-metrics/server-timing-metrics.component';
import { ServerTiming } from '../models/server-timing.model';
import { ServerTimingConfig } from './server-timing-config.service';

@Injectable({
  providedIn: 'root'
})
export class ServerTimingVisualizerService {
  private viewContainerRef: ViewContainerRef;
  private serverTimingMetricsComponent: ServerTimingMetricsComponent;

  constructor(private serverTimingConfig: ServerTimingConfig, private componentFactory: ComponentFactoryResolver) { }

  public setViewContainer(viewContainer: ViewContainerRef) {
    if(!this.serverTimingConfig.enabled) return;

    this.viewContainerRef = viewContainer;
    const factory = this.componentFactory.resolveComponentFactory(ServerTimingMetricsComponent);
    const component = factory.create(this.viewContainerRef.parentInjector)
    this.serverTimingMetricsComponent = component.instance;
    this.viewContainerRef.insert(component.hostView)
  }

  public addTiming(timings: ServerTiming) {
    this.serverTimingMetricsComponent.addTiming(timings);
  }
}
