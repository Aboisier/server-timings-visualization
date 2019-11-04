import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ServerTimingVisualizerService } from 'projects/server-timing-visualizer/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private viewContainer: ViewContainerRef,
    private serverTimingService: ServerTimingVisualizerService) { }

  public ngOnInit(): void {
    this.serverTimingService.setViewContainer(this.viewContainer);
    for (const i of [1, 2, 3, 4, 5]) { this.request(); }
  }

  public async request() {
    await this.http.get('http://www.mocky.io/v2/5dbf0b773300002068a0e4f2').toPromise();
  }
}
