import angular from 'angular';
import playlist from './app/playlist/playlist';
import login from './app/auth/login';
import tracks from './app/tracks/tracks';
import player from './app/player/player';

import sidebar from './app/sidebar/sidebar';

import routesConfig from './routes';

import AuthService from './app/auth/service';
import FirebaseService from './app/firebase/service';
import PlayerService from './app/player/service';
import PlaylistService from './app/playlist/service';
import TracksService from './app/tracks/service';
import YoutubeService from './app/youtube/service';

import 'angular-material';
import 'angular-messages';
import 'angular-ui-router';
import 'angular-youtube-embed';

import './assets/angular-material.min.css';
import './assets/index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ngMaterial', 'ngMessages', 'youtube-embed'])
  .config(routesConfig)
  .service('AuthService', AuthService)
  .service('FirebaseService', FirebaseService)
  .service('PlaylistService', PlaylistService)
  .service('PlayerService', PlayerService)
  .service('TracksService', TracksService)
  .service('YoutubeService', YoutubeService)
  .component('playlist', playlist)
  .component('tracks', tracks)
  .component('login', login)
  .component('sidebar', sidebar)
  .component('player', player);
