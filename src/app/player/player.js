class PlayerController {
  /** @ngInject */
  constructor($rootScope, $scope, $state, $interval, localStorageService, QueueService) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.$interval = $interval;
    this.localStorageService = localStorageService;
    this.queue = QueueService;

    this.currentTrack = null;
    this.isPlaying = false;
    this.youtubePlayer = null;
    this.trackInfo = {currentTime: 0, duration: 0};
    this.interval = null;
    this.showVolumeControl = false;

    // set volume default
    if (!this.localStorageService.get('volume')) {
      this.localStorageService.set('volume', 100);
    }

    this.volume = this.localStorageService.get('volume');

    this.$rootScope.$on('trackChange', (event, track) => this.onTrackChange(track));
    this.$rootScope.$on('nextTrack', () => this.playNextTrack());

    this.$scope.$on('youtube.player.ready', ($event, player) => this.onPlayerReady(player));
    this.$scope.$on('youtube.player.paused', ($event, player) => this.onPlayerPaused(player));
    this.$scope.$on('youtube.player.ended', ($event, player) => this.onPlayerEnded(player));

    this.$scope.$watch(() => this.volume, newValue => this.onVolumeChange(newValue));
  }

  playTrack() {
    if (!this.isPlaying && this.currentTrack) {
      this.youtubePlayer.playVideo();
      this.isPlaying = true;
    }
  }

  playNextTrack() {
    this.isPlaying = false;
    this.$interval.cancel(this.interval);

    const nextTrack = this.queue.nextTrack();

    if (nextTrack) {
      this.currentTrack = nextTrack;
    }
  }

  pauseTrack() {
    this.youtubePlayer.pauseVideo();
    this.isPlaying = false;
  }

  toggleVolumeControl() {
    if (this.showVolumeControl === true) {
      this.showVolumeControl = false;
    } else if (this.showVolumeControl === false) {
      this.showVolumeControl = true;
    }
  }

  onTrackChange(track) {
    if (this.currentTrack === track) {
      this.youtubePlayer.seekTo(0);
    }

    this.currentTrack = track;

    if (this.interval) {
      this.$interval.cancel(this.interval);
    }
  }

  onPlayerReady(player) {
    this.youtubePlayer = player;

    this.isPlaying = true;
    this.youtubePlayer.setVolume(this.volume);
    this.youtubePlayer.playVideo();

    this.interval = this.$interval(() => this.trackTick(), 1000);
  }

  onPlayerPaused(player) {
    this.youtubePlayer = player;
    this.isPlaying = false;
  }

  onPlayerEnded(player) {
    this.youtubePlayer = player;
    this.isPlaying = false;
    this.$interval.cancel(this.interval);

    const nextTrack = this.queue.nextTrack();

    if (nextTrack) {
      this.currentTrack = nextTrack;
    }
  }

  onVolumeChange(volume) {
    this.localStorageService.set('volume', volume);

    if (this.youtubePlayer) {
      this.youtubePlayer.setVolume(volume);
    }
  }

  trackTick() {
    if (this.isPlaying) {
      this.trackInfo.currentTime = this.youtubePlayer.getCurrentTime();
      this.trackInfo.duration = this.youtubePlayer.getDuration();
    }
  }

}

export default {
  template: require('./player.html'),
  controller: PlayerController,
  bindings: {volume: '<', trackInfo: '<'}
};
