class PlayerController {
  /** @ngInject */
  constructor($rootScope, $scope, $log, $state, localStorageService) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.$log = $log;
    this.localStorageService = localStorageService;

    this.currentTrack = null;
    this.isPlaying = false;
    this.youtubePlayer = null;

    // set volume default
    if (!localStorageService.get('volume')) {
      localStorageService.set('volume', 100);
    }

    this.volume = localStorageService.get('volume');

    this.$rootScope.$on('trackChange', (event, args) => this.onTrackChange(args));

    this.$scope.$on('youtube.player.ready', ($event, player) => this.onPlayerReady(player));
    this.$scope.$on('youtube.player.paused', ($event, player) => this.onPlayerPaused(player));

    this.$scope.$watch(() => this.volume, newValue => this.onVolumeChange(newValue));
  }

  playTrack() {
    if (!this.isPlaying && this.currentTrack) {
      this.youtubePlayer.playVideo();
      this.isPlaying = true;
    }
  }

  pauseTrack() {
    this.youtubePlayer.pauseVideo();
  }

  onTrackChange(track) {
    this.currentTrack = track.id;
  }

  onPlayerReady(player) {
    this.youtubePlayer = player;

    this.isPlaying = true;
    this.youtubePlayer.setVolume(this.volume);
    this.youtubePlayer.playVideo();
  }

  onPlayerPaused(player) {
    this.youtubePlayer = player;
    this.isPlaying = false;
  }

  onVolumeChange(volume) {
    this.localStorageService.set('volume', volume);

    if (this.youtubePlayer) {
      this.youtubePlayer.setVolume(volume);
    }
  }

}

export default {
  template: require('./player.html'),
  controller: PlayerController,
  bindings: {volume: '<'}
};
