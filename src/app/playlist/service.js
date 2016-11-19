export default class PlaylistService {
  /** @ngInject */
  constructor($q, FirebaseService, AuthService) {
    this.$q = $q;
    this.firebase = FirebaseService;
    this.auth = AuthService;
    this.database = this.firebase.getDatabase();
  }

  addPlaylist(playlist) {
    const defer = this.$q.defer();
    const userId = this.auth.getUserId();

    playlist.image = 'https://i.ytimg.com/vi/JhCZ6SwKuCo/mqdefault.jpg'; // set default background

    this.database
    .ref(`playlists/${userId}`)
    .push(playlist)
    .then(() => {
      defer.resolve();
    })
    .catch(error => {
      defer.reject(error);
    });

    return defer.promise;
  }

  getPlaylists() {
    const defer = this.$q.defer();
    const userId = this.auth.getUserId();

    this.database
    .ref(`playlists/${userId}`)
    .once('value')
    .then(snapshot => {
      defer.resolve(snapshot.val());
    })
    .catch(error => {
      defer.reject(error);
    });

    return defer.promise;
  }

  setBackground(playlistId, url) {
    const defer = this.$q.defer();
    const userId = this.auth.getUserId();

    const update = {image: url};

    this.database
    .ref(`playlists/${userId}`)
    .child(playlistId)
    .update(update)
    .then(() => {
      defer.resolve();
    })
    .catch(error => {
      defer.reject(error);
    });

    return defer.promise;
  }

  removePlaylist(playlistId) {
    const defer = this.$q.defer();
    const userId = this.auth.getUserId();

    this.database
    .ref(`playlists/${userId}`)
    .child(playlistId)
    .remove()
    .then(() => {
      defer.resolve();
    })
    .catch(error => {
      defer.reject(error);
    });

    return defer.promise;
  }

}
