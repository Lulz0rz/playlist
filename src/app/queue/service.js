export default class QueueService {

  constructor($q) {
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

  addToQueue() {

  }

  removeQueueTrack() {

  }

  clearQueue() {

  }

}
