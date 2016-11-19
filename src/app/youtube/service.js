import apiKey from '../config/youtube';

export default class YoutubeService {
  /** @ngInject */
  constructor($q, $http) {
    this.$q = $q;
    this.$http = $http;
  }

  search(query) {
    const defer = this.$q.defer();

    this.$http.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=10&q=${query}`)
    .then(response => {
      if (response.data && response.data.items.length > 0) {
        defer.resolve(response.data.items);
      }
    },
    err => {
      defer.reject(err);
    });

    return defer.promise;
  }

}
