export default storageConfig;

/** @ngInject */
function storageConfig(localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('playlist');
}
