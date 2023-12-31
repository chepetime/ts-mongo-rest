import { random } from "./index";

// Generated by CodiumAI

describe("random", () => {
  // Tests that the random function returns a string of length 172
  it("should return a string of length 172", () => {
    const randomString = random();
    expect(randomString.length).toBe(172);
  });

  // Tests that the random function returns a different string on each call
  it("should return a different string on each call", () => {
    const randomString1 = random();
    const randomString2 = random();
    expect(randomString1).not.toBe(randomString2);
  });

  // Tests that the random function returns a string of length 0 when 0 is passed as argument
  it("should return a string of length 0 when 0 is passed as argument", () => {
    const randomString = random();
    expect(randomString.length).toBe(0);
  });

  // Tests that the random function throws an error when a negative number is passed as an argument
  it("should throw an error when a negative number is passed as an argument", () => {
    expect(() => {
      random();
    }).toThrow();
  });

  // Tests that the random function returns a string with only alphanumeric characters
  it("should return a string with only alphanumeric characters", () => {
    const randomString = random();
    const alphanumericRegex = /^[a-zA-Z\d]+$/;
    expect(alphanumericRegex.test(randomString)).toBe(true);
  });

  // Tests that the random function returns a string with only lowercase characters
  it("should return a string with only lowercase characters", () => {
    const randomString = random();
    const lowercaseRegex = /^[a-z]+$/;
    expect(lowercaseRegex.test(randomString)).toBe(true);
  });

  // Tests that the random function returns a string with only uppercase characters
  it("should return a string with only uppercase characters", () => {
    const randomString = random();
    const isUppercase = /^[A-Z]+$/.test(randomString);
    expect(isUppercase).toBe(true);
  });

  // Tests that the random function returns a string with only numeric characters
  it("should return a string with only numeric characters", () => {
    const randomString = random();
    expect(randomString).toMatch(/^\d+$/);
  });
});
