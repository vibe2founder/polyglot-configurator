const { describe, it } = require("node:test");
const assert = require("node:assert");
const { parseYaml } = require("../src/parser");

describe("YAML Deep Nesting and Complex Arrays", () => {
  it("should handle objects within arrays with nested properties", () => {
    const yaml = `
list:
  - name: item1
    meta:
      id: 101
      tags:
        - raw
        - processed
  - name: item2
    meta:
      id: 102
`;
    const result = parseYaml(yaml);
    assert.strictEqual(result.list.length, 2);
    assert.strictEqual(result.list[0].name, "item1");
    assert.strictEqual(result.list[0].meta.id, 101);
    assert.strictEqual(result.list[0].meta.tags[1], "processed");
  });

  it("should handle deep nesting without arrays", () => {
    const yaml = `
a:
  b:
    c:
      d:
        e:
          f: "final"
`;
    const result = parseYaml(yaml);
    assert.strictEqual(result.a.b.c.d.e.f, "final");
  });

  it("should handle multiple root keys with complex values", () => {
    const yaml = `
api:
  url: http://localhost
  timeout: 5000
db:
  host: 127.0.0.1
  auth:
    user: admin
    pass: secret
`;
    const result = parseYaml(yaml);
    assert.strictEqual(result.api.timeout, 5000);
    assert.strictEqual(result.db.auth.user, "admin");
  });
});
