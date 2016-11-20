import angular from 'angular';
import 'angular-mocks';

import QueueComponent from './queue';

describe('Queue component', () => {
  let controller;
  let mockQueueService;
  let $rootScope;

  const track = {id: 'test', image: 'http://test.com/test.png', title: 'test'};
  const tracks = [
    {id: 'test1', image: 'http://test.com/test1.png', title: 'test1'},
    {id: 'test2', image: 'http://test.com/test2.png', title: 'test2'},
    {id: 'test3', image: 'http://test.com/test3.png', title: 'test3'}
  ];

  beforeEach(angular.mock.inject(($q, _$rootScope_) => {
    mockQueueService = {
      getQueue: () => $q.resolve(tracks),
      removeTrackFromQueue: jasmine.createSpy('spy')
    };

    $rootScope = _$rootScope_;
    controller = new QueueComponent.controller({}, mockQueueService); // eslint-disable-line babel/new-cap
  }));

  it('remove track and reload queue', () => {
    controller.removeTrackFromQueue(track);
    expect(mockQueueService.removeTrackFromQueue).toHaveBeenCalledWith(track);
    $rootScope.$apply();
    expect(controller.queuedTracks).toEqual(tracks);
  });
});
