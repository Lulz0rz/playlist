import angular from 'angular';
import playlist from './app/playlist/playlist';
import login from './app/auth/login';
import tracks from './app/tracks/tracks';
import player from './app/player/player';
import queue from './app/queue/queue';
import sidebar from './app/sidebar/sidebar';

import routesConfig from './routes';
import storageConfig from './storage';

import AuthService from './app/auth/service';
import FirebaseService from './app/firebase/service';
import PlaylistService from './app/playlist/service';
import TracksService from './app/tracks/service';
import QueueService from './app/queue/service';
import YoutubeService from './app/youtube/service';

import 'angular-material';
import 'angular-messages';
import 'angular-ui-router';
import 'angular-youtube-embed';
import 'angular-local-storage';

import './assets/angular-material.min.css';
import './assets/index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ngMaterial', 'ngMessages', 'youtube-embed', 'LocalStorageModule'])
  .config(routesConfig)
  .config(storageConfig)
  .service('AuthService', AuthService)
  .service('FirebaseService', FirebaseService)
  .service('PlaylistService', PlaylistService)
  .service('TracksService', TracksService)
  .service('YoutubeService', YoutubeService)
  .service('QueueService', QueueService)
  .component('playlist', playlist)
  .component('tracks', tracks)
  .component('login', login)
  .component('sidebar', sidebar)
  .component('player', player)
  .component('queue', queue);
