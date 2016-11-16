import CreatePlaylistController from './playlist.create';

class PlaylistController {
  /** @ngInject */
  constructor($document, $log, $mdDialog, $mdSidenav, PlaylistService) {
    this.$document = $document;
    this.$log = $log;
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;
    this.playlist = PlaylistService;
  }

  refreshPlaylists() {
    this.playlist.getPlaylists()
    .then(tracks => {
      this.playlists = tracks;
    });
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
