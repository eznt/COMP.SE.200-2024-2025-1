import { expect } from "chai";
import map from "../src/map.js";

describe("map function", () => {
  // Positive test cases
  it("should return a new array with elements transformed by the iteratee", () => {
    const result = map([4, 8], (n) => n * n);
    expect(result).to.deep.equal([16, 64]);
  });

  it("should handle an empty array", () => {
    const result = map([], (n) => n * n);
    expect(result).to.deep.equal([]);
  });

  it("should invoke the iteratee with value, index, and array", () => {
    const result = [];
    map([10, 20, 30], (value, index, array) => {
      result.push([value, index, array]);
    });
    expect(result).to.deep.equal([
      [10, 0, [10, 20, 30]],
      [20, 1, [10, 20, 30]],
      [30, 2, [10, 20, 30]],
    ]);
  });

  // Edge cases
  it("should handle arrays with mixed data types", () => {
    const result = map([1, "2", null, undefined, true], (value) =>
      String(value)
    );
    expect(result).to.deep.equal(["1", "2", "null", "undefined", "true"]);
  });

  it("should work with sparse arrays", () => {
    const sparseArray = [1, , 3]; // Sparse array
    const result = map(sparseArray, (value) => (value ? value * 2 : "missing"));
    expect(result).to.deep.equal([2, "missing", 6]);
  });

  it("should handle large arrays efficiently", () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const result = map(largeArray, (n) => n * 2);
    expect(result[9999]).to.equal(19998); // Test the last element
  });

  // Negative cases
  it("should return an empty array for non-array-like inputs", () => {
    expect(map(null, (n) => n * n)).to.deep.equal([]);
    expect(map(undefined, (n) => n * n)).to.deep.equal([]);
    expect(map(42, (n) => n * n)).to.deep.equal([]);
});

  it("should throw an error if iteratee is not a function", () => {
    expect(() => map([1, 2, 3], null)).to.throw();
    expect(() => map([1, 2, 3], undefined)).to.throw();
    expect(() => map([1, 2, 3], "not a function")).to.throw();
  });

  // Special cases
  it("should allow the iteratee to modify the original array", () => {
    const array = [1, 2, 3];
    const result = map(array, (value, index, arr) => {
      arr[index] = value * 2; // Modify original array
      return value * 2;
    });
    expect(result).to.deep.equal([2, 4, 6]);
    expect(array).to.deep.equal([2, 4, 6]); // Original array modified
  });

  it("should handle objects with numeric keys as array-like structures", () => {
    const arrayLike = { 0: "a", 1: "b", length: 2 };
    const result = map(arrayLike, (value) => value.toUpperCase());
    expect(result).to.deep.equal(["A", "B"]);
  });

  it("should return a shallow copy for an identity iteratee", () => {
    const array = [1, 2, 3];
    const result = map(array, (n) => n);
    expect(result).to.deep.equal(array);
    expect(result).to.not.equal(array); // Ensure a new array is returned
  });
});
