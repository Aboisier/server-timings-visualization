import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ServerTiming } from '../../models/server-timing.model';

@Component({
  selector: 'lib-server-timing-metric',
  styleUrls: ['server-timing-metric.component.css'],
  templateUrl: 'server-timing-metric.component.html',
})
export class ServerTimingMetricComponent {

  @Input() public timing: ServerTiming;

  public shouldShowDetails: boolean = false;

  constructor() { }

  @HostListener('mouseenter')
  public showDetails() {
    this.shouldShowDetails = true;
  }
  
  @HostListener('mouseout')
  public hideDetails() {
    this.shouldShowDetails = false;
  }
}
