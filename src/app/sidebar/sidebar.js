class SidebarController {
  /** @ngInject */
  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

  closeSidebar() {
    this.$mdSidenav('left').close();
  }

}

export default {
  template: require('./sidebar.html'),
  controller: SidebarController
};
