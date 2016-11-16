class LoginController {
  /** @ngInject */
  constructor(AuthService) {
    this.authService = AuthService;
  }

  login() {
    this.authService.signInWithPopup();
  }

}

export default {
  template: require('./login.html'),
  controller: LoginController
};
