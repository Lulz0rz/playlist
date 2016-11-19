import angular from 'angular';
import 'angular-mocks';

import QueueService from './service';

class LocalStorageMock {

  constructor() {
    this.data = [];
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
  }
}

describe("QueueService", () => {
  let queueService;
  let localStorageMock;

  beforeEach(angular.mock.inject(_$q_ => {
    localStorageMock = new LocalStorageMock();
    queueService = new QueueService(_$q_, localStorageMock);
  }));

  it('initialization', () => {
    expect(queueService.currentTrack).toBe(null);
    expect(queueService.track).toBe(null);
    expect(queueService.queue).toEqual([]);
  });

  it('set/get current track', () => {
    const testTrack = {id: 'test', image: 'http://test.com/test.png', title: 'test'};

    queueService.track = testTrack;
    expect(queueService.track).toEqual(testTrack);
  });

  it('add track to queue', () => {
    const testTrack = {id: 'test', image: 'http://test.com/test.png', title: 'test'};
    queueService.addTracksToQueue(testTrack);
  });
});
