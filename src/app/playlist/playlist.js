import CreatePlaylistController from './playlist.create';

class PlaylistController {
  /** @ngInject */
  constructor($document, $scope, $mdDialog, $mdSidenav, $mdToast, PlaylistService, TracksService, QueueService) {
    this.$document = $document;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;
    this.$mdToast = $mdToast;
    this.playlist = PlaylistService;
    this.tracks = TracksService;
    this.queue = QueueService;
  }

  refreshPlaylists() {
    this.playlist.getPlaylists()
    .then(playlists => {
      this.playlists = playlists;
    });
  }

  queueTracksAndPlay(playlistId) {
    this.tracks.getTracks(playlistId)
    .then(tracks => {
      if (tracks) {
        const trackCount = Object.keys(tracks).length;
        this.notify(`${trackCount} tracks queued`);
      }

      this.queue.addTracksToQueue(tracks);
      this.$scope.$emit('nextTrack');
    });
  }

  queueTracks(playlistId) {
    this.tracks.getTracks(playlistId)
    .then(tracks => {
      if (tracks) {
        const trackCount = Object.keys(tracks).length;
        this.notify(`${trackCount} tracks queued`);
      }

      this.queue.addTracksToQueue(tracks);
    });
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

  createPlaylistDialog(ev) {
    const parentEl = angular.element(this.$document.body);

    const dialog = this.$mdDialog.show({
      parent: parentEl,
      targetEvent: ev,
      template: require('./playlist.create.html'),
      controller: CreatePlaylistController,
      controllerAs: 'dialog'
    });

    dialog.then(() => {
      this.refreshPlaylists();
    });
  }

  confirmDeletePlaylist(ev, id) {
    const confirm = this.$mdDialog.confirm()
    .title('Are you sure you wish delete this playlist?')
    .textContent('This will result in loss of all track data.')
    .targetEvent(ev)
    .ok('Delete it!')
    .cancel('No thanks');

    const dialog = this.$mdDialog.show(confirm);

    dialog.then(() => {
      return this.playlist.removePlaylist(id);
    })
    .then(() => {
      this.refreshPlaylists();
    });
  }

  toggleSidebar() {
    this.$mdSidenav('left').toggle();
  }

}

export default {
  template: require('./playlist.html'),
  controller: PlaylistController,
  bindings: {playlists: '<'}
};
