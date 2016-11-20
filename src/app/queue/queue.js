class QueueController {
  /** @ngInject */
  constructor($mdSidenav, QueueService) {
    this.$mdSidenav = $mdSidenav;
    this.queue = QueueService;
  }

  toggleSidebar() {
    this.$mdSidenav('left').toggle();
  }

  removeTrackFromQueue(track) {
    this.queue.removeTrackFromQueue(track);
    this.queue.getQueue().then(queue => {
      this.queuedTracks = queue;
    });
  }
}

export default {
  template: require('./queue.html'),
  controller: QueueController,
  bindings: {queuedTracks: '<'}
};
