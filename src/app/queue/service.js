const each = require('lodash/each');

export default class QueueService {
  /** @ngInject */
  constructor($q, localStorageService) {
    this.$q = $q;
    this.localStorageService = localStorageService;

    if (!localStorageService.get('queue')) {
      this.localStorageService.set('queue', []);
    }

    this.queue = this.localStorageService.get('queue');
  }

  getQueue() {
    return this.$q.resolve(this.queue);
  }

  nextTrack() {
    const track = this.queue.shift();
    this.localStorageService.set('queue', this.queue);
    return track;
  }

  addTrackToQueue(track) {
    this.queue.push(track);
    this.localStorageService.set('queue', this.queue);
  }

  addTracksToQueue(tracks) {
    each(tracks, track => {
      this.queue.push(track);
    });

    this.localStorageService.set('queue', this.queue);
  }

  removeTrackFromQueue(index) {
    this.queue.splice(index, 1);
    this.localStorageService.set('queue', this.queue);
  }

  clearQueue() {
    this.queue = [];
  }
}
