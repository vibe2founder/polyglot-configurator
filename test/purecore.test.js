const { describe, it } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { parseYaml, loadEnv, loadYaml } = require("../src/index");

describe("one-configurator-4-all Core - parseYaml", () => {
  it("should parse simple key-value pairs", () => {
    const yaml = "name: one-configurator-4-all\nversion: 1.0.0";
    const result = parseYaml(yaml);
    assert.strictEqual(result.name, "one-configurator-4-all");
    assert.strictEqual(result.version, "1.0.0");
  });

  it("should parse nested objects", () => {
    const yaml = "app:\n  name: TestApp\n  settings:\n    port: 8080";
    const result = parseYaml(yaml);
    assert.strictEqual(result.app.name, "TestApp");
    assert.strictEqual(result.app.settings.port, 8080);
  });

  it("should parse lists (arrays)", () => {
    const yaml = "features:\n  - auth\n  - logging\n  - cache";
    const result = parseYaml(yaml);
    assert.ok(Array.isArray(result.features));
    assert.strictEqual(result.features.length, 3);
    assert.strictEqual(result.features[0], "auth");
    assert.strictEqual(result.features[1], "logging");
    assert.strictEqual(result.features[2], "cache");
  });

  it("should ignore comments and empty lines", () => {
    const yaml = "# Comment\n\nkey: value # Inline comment";
    const result = parseYaml(yaml);
    assert.strictEqual(result.key, "value");
    assert.strictEqual(Object.keys(result).length, 1);
  });

  it("should convert types correctly (bool, number, null)", () => {
    const yaml = 'active: true\ncount: 42\nempty: null\nname: "3000"';
    const result = parseYaml(yaml);
    assert.strictEqual(result.active, true);
    assert.strictEqual(result.count, 42);
    assert.strictEqual(result.empty, null);
    assert.strictEqual(result.name, "3000");
  });
});

describe("one-configurator-4-all Core - loadEnv", () => {
  const envFile = path.join(__dirname, ".test.env");

  it("should load variables into process.env", () => {
    fs.writeFileSync(envFile, "TEST_VAR=hello\nTEST_PORT=9999");
    loadEnv(envFile);
    assert.strictEqual(process.env.TEST_VAR, "hello");
    assert.strictEqual(process.env.TEST_PORT, "9999");
    if (fs.existsSync(envFile)) fs.unlinkSync(envFile);
  });

  it("should ignore comments and handle inline comments in .env", () => {
    fs.writeFileSync(
      envFile,
      '# Secret\nSECRET_KEY=123 # internal\nQUOTED_KEY="abc # def"',
    );
    loadEnv(envFile);
    assert.strictEqual(process.env.SECRET_KEY, "123");
    assert.strictEqual(process.env.QUOTED_KEY, "abc # def");
    if (fs.existsSync(envFile)) fs.unlinkSync(envFile);
  });
});

describe("one-configurator-4-all Core - loadYaml", () => {
  const yamlFile = path.join(__dirname, "test.yml");

  it("should load and parse yaml file", () => {
    fs.writeFileSync(yamlFile, "test: success");
    const result = loadYaml(yamlFile);
    assert.strictEqual(result.test, "success");
    if (fs.existsSync(yamlFile)) fs.unlinkSync(yamlFile);
  });

  it("should return null for non-existent file", () => {
    const result = loadYaml("non-existent.yml");
    assert.strictEqual(result, null);
  });
});

describe("one-configurator-4-all Utility - getConfig (Simulation from Examples)", () => {
  const mockConfig = {
    all: {
      app: { name: "Purecore", version: "1.0.0" },
      db: { host: "localhost" },
    },
  };

  const getConfig = (path) => {
    if (!mockConfig.all) return undefined;
    const keys = path.split(".");
    let current = mockConfig.all;
    for (const key of keys) {
      if (current && typeof current === "object") {
        current = current[key];
      } else {
        return undefined;
      }
    }
    return current;
  };

  it("should return nested properties using dot notation", () => {
    assert.strictEqual(getConfig("app.name"), "Purecore");
    assert.strictEqual(getConfig("app.version"), "1.0.0");
    assert.strictEqual(getConfig("db.host"), "localhost");
  });

  it("should return undefined for non-existent paths", () => {
    assert.strictEqual(getConfig("app.timeout"), undefined);
    assert.strictEqual(getConfig("server.port"), undefined);
  });
});
