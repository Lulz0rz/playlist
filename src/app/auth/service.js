export default class AuthService {
  /** @ngInject */
  constructor($log, $q, $state, FirebaseService) {
    this.$log = $log;
    this.$q = $q;
    this.$state = $state;
    this.firebase = FirebaseService;
    this.authenticated = false;
    this.user = null;
  }

  signInWithPopup() {
    this.firebase.get().auth().signInWithPopup(this.firebase.getGoogleAuthProvider())
    .then(result => {
      this.user = result.user;
      this.$state.go('playlist');
    })
    .catch(error => {
      this.$log.error(error);
    });
  }

  getUserId() {
    return this.user.uid;
  }

  isAuthenticated() {
    const defer = this.$q.defer();

    if (this.authenticated && this.user) {
      defer.resolve(this.user);
    } else {
      this.firebase.get()
      .auth().onAuthStateChanged(user => {
        if (user) {
          this.authenticated = true;
          this.user = user;
          defer.resolve(user);
        } else {
          defer.reject();
        }
      });
    }

    return defer.promise;
  }
}
