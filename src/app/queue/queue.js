class QueueController {
  /** @ngInject */
  constructor($log, $mdSidenav, QueueService) {
    this.$mdSidenav = $mdSidenav;
    this.queue = QueueService;
    this.$log = $log;
  }

  toggleSidebar() {
    this.$mdSidenav('left').toggle();
  }

  removeTrackFromQueue(track) {
    this.queue.removeTrackFromQueue(track);
    this.queue.getQueue().then(queue => {
      this.queuedTracks = queue;
      this.$log.warn(queue);
    });
  }

}

export default {
  template: require('./queue.html'),
  controller: QueueController,
  bindings: {queuedTracks: '<'}
};
