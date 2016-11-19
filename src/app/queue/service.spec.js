import angular from 'angular';
import 'angular-mocks';

import QueueService from './service';
import LocalStorageMock from '../mocks/localstorage.mock';

describe('QueueService', () => {
  let queueService;
  let localStorageMock;

  const track = {id: 'test', image: 'http://test.com/test.png', title: 'test'};
  const tracks = {
    test1: {id: 'test1', image: 'http://test.com/test1.png', title: 'test1'},
    test2: {id: 'test2', image: 'http://test.com/test2.png', title: 'test2'},
    test3: {id: 'test3', image: 'http://test.com/test3.png', title: 'test3'}
  };

  beforeEach(angular.mock.inject(_$q_ => {
    localStorageMock = new LocalStorageMock();
    queueService = new QueueService(_$q_, localStorageMock);

    spyOn(localStorageMock, 'get');
    spyOn(localStorageMock, 'set');
  }));

  it('initialization', () => {
    expect(queueService.queue).toEqual([]);
  });``

  it('add track to queue', () => {
    queueService.addTrackToQueue(track);
    expect(queueService.queue).toContain(track);

    expect(localStorageMock.set).toHaveBeenCalled();
  });

  it('add tracks to queue', () => {
    queueService.addTracksToQueue(tracks);

    expect(queueService.queue).toContain(tracks.test1);
    expect(queueService.queue).toContain(tracks.test2);
    expect(queueService.queue).toContain(tracks.test3);

    expect(localStorageMock.set).toHaveBeenCalled();
  });

  it('next track', () => {
    queueService.track = track;
    queueService.addTracksToQueue(tracks);

    expect(queueService.queue.length).toEqual(3);

    queueService.nextTrack();

    expect(queueService.track).toEqual(tracks.test1);
    expect(queueService.queue).not.toContain(tracks.test1);

    expect(localStorageMock.set).toHaveBeenCalled();
  });

  it('remove track from queue', () => {
    queueService.addTracksToQueue(tracks);
    expect(queueService.queue.length).toEqual(3);

    queueService.removeTrackFromQueue(2);
    expect(queueService.queue).not.toContain(tracks.test3);

    expect(localStorageMock.set).toHaveBeenCalled();
  });

  it('clear queue', () => {
    queueService.addTracksToQueue(tracks);
    expect(queueService.queue.length).toEqual(3);

    queueService.clearQueue();
    expect(queueService.queue.length).toEqual(0);
  });
});
