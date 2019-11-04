import { TestBed } from '@angular/core/testing';

import { ServerTimingVisualizerService } from './server-timing-visualizer.service';

describe('ServerTimingVisualizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerTimingVisualizerService = TestBed.get(ServerTimingVisualizerService);
    expect(service).toBeTruthy();
  });
});
