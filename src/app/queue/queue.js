class QueueController {
  /** @ngInject */
  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

  toggleSidebar() {
    this.$mdSidenav('left').toggle();
  }

}

export default {
  template: require('./queue.html'),
  controller: QueueController,
  bindings: {queuedTracks: '<'}
};
