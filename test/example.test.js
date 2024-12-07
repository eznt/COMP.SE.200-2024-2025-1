import { expect } from "chai";

describe("Array", function () {
  it("should return -1 when value is not present", function () {
    expect([1, 2, 3].indexOf(4)).to.equal(-1);
  });
});
