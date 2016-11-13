const angular = require('angular');

describe("A suite is just a function", () => {
  let a;

  angular.module('test', []);

  it("and so is a spec", () => {
    a = true;

    expect(a).toBe(true);
  });
});
