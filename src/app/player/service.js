export default class PlayerService {

  constructor() {
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

  addToQueue() {

  }

  removeQueueTrack() {

  }

  clearQueue() {

  }

}
