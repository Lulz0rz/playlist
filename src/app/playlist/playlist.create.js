export default class CreatePlaylistController {
  /** @ngInject */
  constructor($log, $mdDialog, PlaylistService) {
    this.$log = $log;
    this.$mdDialog = $mdDialog;
    this.playlist = PlaylistService;

    this.newPlaylist = null;
  }

  createNewPlaylist() {
    this.playlist.addPlaylist(this.newPlaylist)
    .then(() => {
      this.$mdDialog.hide();
    });
  }

  closeDialog() {
    this.$mdDialog.hide();
  }

}
