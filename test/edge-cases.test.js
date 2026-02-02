const { describe, it } = require("node:test");
const assert = require("node:assert");
const { parseYaml, parseEnv } = require("../src/parser");

describe("one-configurator-4-all Edge Cases - parseYaml", () => {
  it("should handle deeply nested structures", () => {
    const yaml = `
level1:
  level2:
    level3:
      level4:
        value: deep
`;
    const result = parseYaml(yaml);
    assert.strictEqual(result.level1.level2.level3.level4.value, "deep");
  });

  it("should handle arrays of objects", () => {
    const yaml = `
users:
  - id: 1
    name: Alice
  - id: 2
    name: Bob
`;
    const result = parseYaml(yaml);
    assert.ok(Array.isArray(result.users));
    assert.strictEqual(result.users.length, 2);
    assert.strictEqual(result.users[0].id, 1);
    assert.strictEqual(result.users[0].name, "Alice");
  });

  it("should handle list items after an object in the same level", () => {
    // This tests if it correctly transitions between object keys and list items
    const yaml = `
config:
  prop: val
  items:
    - one
    - two
`;
    const result = parseYaml(yaml);
    assert.strictEqual(result.config.prop, "val");
    assert.ok(Array.isArray(result.config.items));
    assert.strictEqual(result.config.items[1], "two");
  });

  it("should handle numbers with decimals", () => {
    const yaml = "pi: 3.14159\nnegative: -42.5";
    const result = parseYaml(yaml);
    assert.strictEqual(result.pi, 3.14159);
    assert.strictEqual(result.negative, -42.5);
  });

  it("should preserve strings that look like numbers if quoted", () => {
    const yaml = 'string_num: "123"\nplain_num: 123';
    const result = parseYaml(yaml);
    assert.strictEqual(result.string_num, "123");
    assert.strictEqual(result.plain_num, 123);
  });
});

describe("one-configurator-4-all Edge Cases - parseEnv", () => {
  it("should handle multiple equal signs (values with equals)", () => {
    const env = "CONNECTION_STRING=host=localhost;port=5432;user=admin";
    const result = parseEnv(env);
    assert.strictEqual(
      result.CONNECTION_STRING,
      "host=localhost;port=5432;user=admin",
    );
  });

  it("should handle empty values", () => {
    const env = "EMPTY_VAR=\nSTILL_EMPTY=  ";
    const result = parseEnv(env);
    assert.strictEqual(result.EMPTY_VAR, "");
    assert.strictEqual(result.STILL_EMPTY, "");
  });

  it("should handle values with trailing spaces if NOT quoted", () => {
    const env = "VAR=value  # comment";
    const result = parseEnv(env);
    assert.strictEqual(result.VAR, "value");
  });
});
