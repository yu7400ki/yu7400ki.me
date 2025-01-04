import { describe, expect, test } from "bun:test";
import { PERMALINK_REGEX, parsePermalink } from "./github";

describe("github", () => {
  describe("PERMALINK_REGEX", () => {
    test("lineを含むURLにマッチする", () => {
      const url =
        "https://github.com/yu7400ki/yu7400ki.me/blob/hash/path/to/file#L1";
      expect(PERMALINK_REGEX.test(url)).toBe(true);
    });

    test("複数lineを含むURLにマッチする", () => {
      const url =
        "https://github.com/yu7400ki/yu7400ki.me/blob/hash/path/to/file#L1-L2";
      expect(PERMALINK_REGEX.test(url)).toBe(true);
    });

    test("lineを含まないURLにマッチする", () => {
      const url =
        "https://github.com/yu7400ki/yu7400ki.me/blob/hash/path/to/file";
      expect(PERMALINK_REGEX.test(url)).toBe(true);
    });

    test("不正なURLにマッチしない", () => {
      const url = "https://example.com";
      expect(PERMALINK_REGEX.test(url)).toBe(false);
    });
  });

  describe("parsePermalink", () => {
    test("lineを含むURLをパースする", () => {
      const url =
        "https://github.com/yu7400ki/yu7400ki.me/blob/hash/path/to/file#L1";
      const expected = {
        owner: "yu7400ki",
        repository: "yu7400ki.me",
        commit: "hash",
        path: "path/to/file",
        line: 1,
        lineEnd: undefined,
      };
      expect(parsePermalink(url)).toEqual(expected);
    });

    test("複数lineを含むURLをパースする", () => {
      const url =
        "https://github.com/yu7400ki/yu7400ki.me/blob/hash/path/to/file#L1-L2";
      const expected = {
        owner: "yu7400ki",
        repository: "yu7400ki.me",
        commit: "hash",
        path: "path/to/file",
        line: 1,
        lineEnd: 2,
      };
      expect(parsePermalink(url)).toEqual(expected);
    });

    test("lineを含まないURLをパースする", () => {
      const url =
        "https://github.com/yu7400ki/yu7400ki.me/blob/hash/path/to/file";
      const expected = {
        owner: "yu7400ki",
        repository: "yu7400ki.me",
        commit: "hash",
        path: "path/to/file",
        line: undefined,
        lineEnd: undefined,
      };
      expect(parsePermalink(url)).toEqual(expected);
    });

    test("不正なURLをパースする", () => {
      const url = "https://example.com";
      expect(() => parsePermalink(url)).toThrowError("Invalid permalink");
    });
  });
});
