export default class TracksService {
  /** @ngInject */
  constructor($q, FirebaseService) {
    this.$q = $q;
    this.firebase = FirebaseService;
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
    .push({id: track.id.videoId, title: track.snippet.title, image: track.snippet.thumbnails.medium.url})
    .then(() => {
      defer.resolve();
    })
    .catch(error => {
      defer.reject(error);
    });

    return defer.promise;
  }

  removeTrack(playlistId, trackId) {
    const defer = this.$q.defer();

    this.database
    .ref(`tracks/${playlistId}`)
    .child(trackId)
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
