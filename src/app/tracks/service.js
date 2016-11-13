export default class TracksService {

  constructor($log, $q, FirebaseService, AuthService) {
    this.$log = $log;
    this.$q = $q;
    this.firebase = FirebaseService;
    this.auth = AuthService;
    this.database = this.firebase.getDatabase();
  }

  getTracks(playlistId) {
    const defer = this.$q.defer();

    this.database
    .ref(`tracks/${playlistId}`)
    .once('value')
    .then(snapshot => {
      defer.resolve(snapshot.val());
    })
    .catch(error => {
      defer.reject(error);
    });

    return defer.promise;
  }

  addTrack(playlistId, track) {
    const defer = this.$q.defer();

    this.database
    .ref(`tracks/${playlistId}`)
    .child(track.id.videoId)
    .set({id: track.id.videoId, title: track.snippet.title, image: track.snippet.thumbnails.medium.url})
    .then(() => {
      defer.resolve();
    })
    .catch(error => {
      defer.reject(error);
    });

    return defer.promise;
  }

  removeTrack(playlistId, track) {
    const defer = this.$q.defer();

    this.database
    .ref(`tracks/${playlistId}`)
    .child(track.id)
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
