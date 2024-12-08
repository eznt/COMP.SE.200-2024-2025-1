import { expect } from "chai";
import filter from "../src/filter.js";

describe("filter function", () => {
  // Positive cases
  it("should return an array of elements for which the predicate returns truthy", () => {
    const users = [
      { user: "barney", active: true },
      { user: "fred", active: false },
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).to.deep.equal([{ user: "barney", active: true }]);
  });

  it("should return all elements when the predicate always returns true", () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = filter(numbers, () => true);
    expect(result).to.deep.equal(numbers);
  });

  it("should return an empty array when the predicate always returns false", () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = filter(numbers, () => false);
    expect(result).to.deep.equal([]);
  });

  it("should correctly filter elements based on index", () => {
    const numbers = [10, 20, 30, 40, 50];
    const result = filter(numbers, (_, index) => index % 2 === 0); // Select even indices
    expect(result).to.deep.equal([10, 30, 50]);
  });

  it("should handle an empty array", () => {
    const result = filter([], () => true);
    expect(result).to.deep.equal([]);
  });

  // Edge cases
  it("should handle arrays with mixed data types", () => {
    const mixedArray = [1, "string", false, {}, [], null, undefined];
    const result = filter(mixedArray, (value) => typeof value === "string");
    expect(result).to.deep.equal(["string"]);
  });

  it("should handle elements where the predicate checks for specific properties", () => {
    const objects = [{ key: 1 }, { key: 2 }, { key: 3 }, { otherKey: 4 }];
    const result = filter(objects, (obj) => obj.key !== undefined);
    expect(result).to.deep.equal([{ key: 1 }, { key: 2 }, { key: 3 }]);
  });

  // Negative cases
  it("should return an empty array if the first argument is not an array", () => {
    expect(filter(null, () => true)).to.deep.equal([]);
    expect(filter(undefined, () => true)).to.deep.equal([]);
    expect(filter({}, () => true)).to.deep.equal([]);
  });
  
  it("should throw an error if the second argument is not a function", () => {
    expect(() => filter([1, 2, 3], null)).to.throw();
    expect(() => filter([1, 2, 3], undefined)).to.throw();
    expect(() => filter([1, 2, 3], "not a function")).to.throw();
  });

  it("should handle sparse arrays", () => {
    const sparseArray = [1, , 3, , 5]; // Sparse array with holes
    const result = filter(sparseArray, (value) => value !== undefined);
    expect(result).to.deep.equal([1, 3, 5]);
  });
});
