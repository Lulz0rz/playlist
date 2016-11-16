export default class QueueService {
  /** @ngInject */
  constructor($log, $q) {
    this.$log = $log;
    this.$q = $q;

    this.currentTrack = null;
    this.queue = [];
  }

  get track() {
    return this.currentTrack;
  }

  set track(track) {
    this.currentTrack = track;
  }

  nextTrack() {

  }

  getQueue() {
    const defer = this.$q.defer();

    defer.resolve(this.queue);

    return defer.promise;
  }

  addToQueue(tracks) {
    this.log.warn(tracks);
    this.queue.push(tracks);
  }

  removeQueueTrack() {

  }

  clearQueue() {

  }

}
