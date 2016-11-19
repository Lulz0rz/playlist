export default class LocalStorageMock {

  constructor() {
    this.data = [];
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
  }
}
