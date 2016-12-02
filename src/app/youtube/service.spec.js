import angular from 'angular';
import 'angular-mocks';

import apiKey from '../config/youtube';
import YoutubeService from './service';

describe('YoutubeService', () => {
  let youtubeService;
  let $rootScope;
  let $httpBackend;
  const query = 'test';
  const searchApi = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=10&q=${query}`;

  const items = {
    items: [
      {
        id: {
          videoId: 'JUju8dijkdfdfi'
        },
        snippet: {
          title: 'Test Track Title',
          thumbnails: {
            medium: {
              url: 'http://image.com'
            }
          }
        }
      }
    ]
  };

  beforeEach(angular.mock.inject(($q, _$rootScope_, $http, $injector) => {
    $httpBackend = $injector.get('$httpBackend');

    $rootScope = _$rootScope_;
    youtubeService = new YoutubeService($q, $http);
  }));

  it('should search youtube and return video data', done => {
    $httpBackend.whenGET(searchApi).respond(items);
    const promise = youtubeService.search(query);

    $httpBackend.flush();
    $rootScope.$apply();

    promise.then(result => {
      expect(result[0].snippet.title).toEqual(items.items[0].snippet.title);
      expect(result[0].snippet.title).toEqual(items.items[0].snippet.title);
      expect(result[0].snippet.thumbnails.medium.url).toEqual(items.items[0].snippet.thumbnails.medium.url);
      done();
    });

    $rootScope.$digest();
  });

  it('should throw error on invalid response', done => {
    $httpBackend.whenGET(searchApi).respond({});
    const promise = youtubeService.search(query);

    $httpBackend.flush();

    promise.catch(err => {
      expect(err.message).toEqual('Invalid api response.');
      done();
    });

    $rootScope.$digest();
  });

  it('should throw error on http error response code', done => {
    $httpBackend.whenGET(searchApi).respond(404);
    const promise = youtubeService.search(query);

    $httpBackend.flush();

    promise.catch(err => {
      expect(err.message).toEqual('Invalid HTTP response.');
      done();
    });

    $rootScope.$digest();
  });

  it('should throw error on no items', done => {
    $httpBackend.whenGET(searchApi).respond({items: []});
    const promise = youtubeService.search(query);

    $httpBackend.flush();

    promise.catch(err => {
      expect(err.message).toEqual('No items in response.');
      done();
    });

    $rootScope.$digest();
  });
});
