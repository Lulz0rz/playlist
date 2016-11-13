class TracksController {

  constructor($log, $stateParams, $mdToast, $mdSidenav, $document, $scope, YoutubeService, FirebaseService, PlaylistService, TracksService) {
    this.$log = $log;
    this.$stateParams = $stateParams;
    this.$mdToast = $mdToast;
    this.$mdSidenav = $mdSidenav;
    this.$document = $document;
    this.$scope = $scope;
    this.youtube = YoutubeService;
    this.playlist = PlaylistService;
    this.tracks = TracksService;
    this.database = FirebaseService.getDatabase();

    this.searchResults = [];
    this.isSearching = false;
  }

  search(query) {
    if (query.length > 2) {
      this.youtube.search(query).then(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  trackExists(track) {
    return this.playlistTracks.hasOwnProperty(track.id.videoId);
  }

  clearSearch() {
    this.searchQuery = '';
  }

  changeTrack(track) {
    this.$scope.$emit('trackChange', track);
  }

  notify(message) {
    const parentEl = angular.element(this.$document.body);

    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(message)
        .position('bottom right')
        .parent(parentEl)
        .hideDelay(3000)
    );
  }

  refreshTracks() {
    this.tracks.getTracks(this.$stateParams.playlistId)
    .then(tracks => {
      this.playlistTracks = tracks;
    });
  }

  addTrackToPlaylist(track) {
    this.tracks
    .addTrack(this.$stateParams.playlistId, track)
    .then(() => {
      this.notify('Track added');
      this.refreshTracks();
    });
  }

  removeTrackFromPlaylist(track) {
    this.tracks
    .removeTrack(this.$stateParams.playlistId, track)
    .then(() => {
      this.notify('Track removed');
      this.refreshTracks();
    });
  }

  setPlaylistBackground(track) {
    this.playlist
    .setBackground(this.$stateParams.playlistId, track.image)
    .then(() => {
      this.notify('Background updated');
    });
  }

  toggleSidebar() {
    this.$mdSidenav('left').toggle();
  }

}

export default {
  template: require('./tracks.html'),
  controller: TracksController,
  bindings: {searchQuery: '<', playlistTracks: '<'}
};
