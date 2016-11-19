const pad = require('lodash/padStart');

export default function () {
  return function (time) {
    const minutes = Math.floor(time / 60);
    const seconds = pad(Math.floor(time % 60), 2, '0');

    return `${minutes}:${seconds}`;
  };
}
