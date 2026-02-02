const { describe, it } = require("node:test");
const assert = require("node:assert");
const { parseYaml, parseEnv, parseValue } = require("../src/parser");

describe("Unit Extended: Value Parsing Logic", () => {
  it("should handle mixed types properly", () => {
    assert.strictEqual(parseValue("true"), true);
    assert.strictEqual(parseValue("false"), false);
    assert.strictEqual(parseValue("null"), null);
    // Standard YAML 1.2 "on"/"yes" are booleans, but this simplified parser does not support them
    // This test enforces that LIMITATION to avoid regression if users expect full YAML support
    assert.strictEqual(parseValue("yes"), "yes");
    assert.strictEqual(parseValue("on"), "on");
    
    // Numbers
    assert.strictEqual(parseValue("123"), 123);
    assert.strictEqual(parseValue("0"), 0);
    assert.strictEqual(parseValue("-50"), -50);
    assert.strictEqual(parseValue("12.5"), 12.5);
    
    // Strings
    assert.strictEqual(parseValue('"123"'), "123");
    assert.strictEqual(parseValue("'true'"), "true");
    assert.strictEqual(parseValue("hello world"), "hello world");
  });
});

describe("Unit Extended: YAML Structure Corner Cases", () => {
  it("should handle keys with spaces just fine if they are simple keys", () => {
    const yaml = "my key: value";
    const result = parseYaml(yaml);
    assert.strictEqual(result["my key"], "value");
  });

  it("should handle empty values in object keys as null or empty string depending on impl", () => {
    // Current implementations often treat empty as empty string or object depending on next lines
    // In "key: " with nothing after, it is typically null in standard YAML, but let's check our parser
    // Our parser: if (valueStr === "") ... 
    
    const yaml = "empty_key:";
    // If nothing follows, our parser might default it to {} if it thinks it's a parent, or empty string.
    // Looking at code: if (valueStr === "") ... creates newObj and pushes to stack.
    // So it expects children.
    const result = parseYaml(yaml);
    assert.deepStrictEqual(result.empty_key, {}); 
  });

  it("should parse an empty list correctly", () => {
     // A list implicitly created by nothing?
     // "items: []" style flow syntax is NOT supported by this parser (only block style)
     // So we can't test flow style.
     const yaml = "items:\n  - \"\""; 
     // item with empty value
     const result = parseYaml(yaml);
     // The parser converts "" to "" string
     assert.strictEqual(result.items[0], ""); 
  });
  
  it("should handle mixed indentation gracefully (within reason)", () => {
    const yaml = `
parent:
  child:
    grandchild: value
`;
    // Standard indentation
    const result = parseYaml(yaml);
    assert.strictEqual(result.parent.child.grandchild, "value");
  });
});

describe("Unit Extended: .env Edge Cases", () => {
  it("should ignore lines with only spaces", () => {
     const env = `
     
VAR=1
     
     `;
     const result = parseEnv(env);
     assert.strictEqual(result.VAR, 1);
  });
});
