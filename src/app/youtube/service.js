import apiKey from '../config/youtube';

export default class YoutubeService {
  /** @ngInject */
  constructor($q, $http) {
    this.$q = $q;
    this.$http = $http;
  }

  search(query) {
    const defer = this.$q.defer();
    const searchApi = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=10&q=${query}`;

    this.$http.get(searchApi)
    .then(response => {
      if (!response.data || !response.data.items) {
        defer.reject(new Error('Invalid api response.'));
        return;
      }

      if (response.data.items.length) {
        defer.resolve(response.data.items);
      } else {
        defer.reject(new Error('No items in response.'));
      }
    },
    () => {
      defer.reject(new Error('Invalid HTTP response.'));
    });

    return defer.promise;
  }

}
