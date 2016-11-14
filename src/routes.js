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
        sidebar: {component: 'sidebar'},
        content: {component: 'playlist'}
      }
    })
    .state('tracks', {
      url: '/tracks/{playlistId}',
      resolve: {
        user: authenticated,
        playlistTracks: (user, $transition$, TracksService) => TracksService.getTracks($transition$.params().playlistId)
      },
      views: {
        sidebar: {component: 'sidebar'},
        content: {component: 'tracks'}
      }
    })
    .state('queue', {
      url: '/queue',
      resolve: {
        user: authenticated,
        queuedTracks: (user, QueueService) => QueueService.getQueue()
      },
      views: {
        sidebar: {component: 'sidebar'},
        content: {component: 'queue'}
      }
    })
    .state('login', {
      url: '/login',
      views: {
        sidebar: {component: 'sidebar'},
        content: {component: 'login'}
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
