import angular from 'angular';

import loginComponent from './app/auth/login';
import tracksComponent from './app/tracks/tracks';
import playlistComponent from './app/playlist/playlist';
import playerComponent from './app/player/player';
import queueComponent from './app/queue/queue';
import sidebarComponent from './app/sidebar/sidebar';

import routesConfig from './routes';
import storageConfig from './storage';

import AuthService from './app/auth/service';
import FirebaseService from './app/firebase/service';
import PlaylistService from './app/playlist/service';
import TracksService from './app/tracks/service';
import QueueService from './app/queue/service';
import YoutubeService from './app/youtube/service';

import TimeFormat from './app/player/filter';

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
  .filter('TimeFormat', TimeFormat)
  .service('AuthService', AuthService)
  .service('FirebaseService', FirebaseService)
  .service('PlaylistService', PlaylistService)
  .service('TracksService', TracksService)
  .service('YoutubeService', YoutubeService)
  .service('QueueService', QueueService)
  .component('playlistComponent', playlistComponent)
  .component('tracksComponent', tracksComponent)
  .component('loginComponent', loginComponent)
  .component('sidebarComponent', sidebarComponent)
  .component('playerComponent', playerComponent)
  .component('queueComponent', queueComponent);
