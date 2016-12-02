import angular from 'angular';
import 'angular-mocks';

import TracksService from './service';

class FirebaseMock {
  ref() {
    return this;
  }

  once() {
    return this;
  }

  then() {
    return this;
  }

  catch() {
    return this;
  }
}

describe('TracksService', () => {
  let tracksService;
  let firebaseServiceMock;
  let $q;
  let $rootScope;
  let firebase;

  beforeEach(angular.mock.inject((_$q_, _$rootScope_) => {
    $q = _$q_;
    $rootScope = _$rootScope_;

    firebaseServiceMock = jasmine.createSpyObj('database', ['getDatabase']);
    firebase = new FirebaseMock();

    firebaseServiceMock.getDatabase.and.returnValue(firebase);

    tracksService = new TracksService($q, firebaseServiceMock);

    spyOn(firebase, 'then');
  }));

  it('firebase get database should be called', () => {
    expect(firebaseServiceMock.getDatabase).toHaveBeenCalled();
  });

  it('should return a list of tracks', () => {
    tracksService.getTracks(1);
    expect(firebase.then).toHaveBeenCalled();
  });
});
