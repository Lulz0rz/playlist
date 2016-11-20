export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('playlist', {
      url: '/',
      resolve: {
        user: authenticated,
        playlists: (user, PlaylistService) => PlaylistService.getPlaylists()
      },
      views: {
        sidebar: {component: 'sidebarComponent'},
        content: {component: 'playlistComponent'}
      }
    })
    .state('tracks', {
      url: '/tracks/{playlistId}',
      resolve: {
        user: authenticated,
        playlistTracks: (user, $transition$, TracksService) => TracksService.getTracks($transition$.params().playlistId)
      },
      views: {
        sidebar: {component: 'sidebarComponent'},
        content: {component: 'tracksComponent'}
      }
    })
    .state('queue', {
      url: '/queue',
      resolve: {
        user: authenticated,
        queuedTracks: (user, QueueService) => QueueService.getQueue()
      },
      views: {
        sidebar: {component: 'sidebarComponent'},
        content: {component: 'queueComponent'}
      }
    })
    .state('login', {
      url: '/login',
      views: {
        sidebar: {component: 'sidebarComponent'},
        content: {component: 'loginComponent'}
      }
    });
}

function authenticated($state, $q, AuthService) {
  const deferred = $q.defer();

  AuthService.isAuthenticated()
  .then(user => {
    deferred.resolve(user);
  },
  () => {
    $state.go('login');
  }
);

  return deferred.promise;
}
