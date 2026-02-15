const { describe, it, expect } = require("@jest/globals");
const fs = require("fs");
const path = require("path");
const { parseYaml, loadEnv, loadYaml } = require("../src/index");

describe("one-configurator-4-all Core - parseYaml", () => {
  it("should parse simple key-value pairs", () => {
    const yaml = "name: one-configurator-4-all\nversion: 1.0.0";
    const result = parseYaml(yaml);
    expect(result.name).toBe("one-configurator-4-all");
    expect(result.version).toBe("1.0.0");
  });

  it("should parse nested objects", () => {
    const yaml = "app:\n  name: TestApp\n  settings:\n    port: 8080";
    const result = parseYaml(yaml);
    expect(result.app.name).toBe("TestApp");
    expect(result.app.settings.port).toBe(8080);
  });

  it("should parse lists (arrays)", () => {
    const yaml = "features:\n  - auth\n  - logging\n  - cache";
    const result = parseYaml(yaml);
    expect(Array.isArray(result.features)).toBe(true);
    expect(result.features).toHaveLength(3);
    expect(result.features[0]).toBe("auth");
    expect(result.features[1]).toBe("logging");
    expect(result.features[2]).toBe("cache");
  });

  it("should ignore comments and empty lines", () => {
    const yaml = "# Comment\n\nkey: value # Inline comment";
    const result = parseYaml(yaml);
    expect(result.key).toBe("value");
    expect(Object.keys(result)).toHaveLength(1);
  });

  it("should convert types correctly (bool, number, null)", () => {
    const yaml = 'active: true\ncount: 42\nempty: null\nname: "3000"';
    const result = parseYaml(yaml);
    expect(result.active).toBe(true);
    expect(result.count).toBe(42);
    expect(result.empty).toBeNull();
    expect(result.name).toBe("3000");
  });
});

describe("one-configurator-4-all Core - loadEnv", () => {
  const envFile = path.join(__dirname, ".test.env.jest");

  it("should load variables into process.env", () => {
    fs.writeFileSync(envFile, "TEST_VAR=hello\nTEST_PORT=9999");
    loadEnv(envFile);
    expect(process.env.TEST_VAR).toBe("hello");
    expect(process.env.TEST_PORT).toBe("9999");
    if (fs.existsSync(envFile)) fs.unlinkSync(envFile);
  });

  it("should ignore comments and handle inline comments in .env", () => {
    fs.writeFileSync(
      envFile,
      '# Secret\nSECRET_KEY_J=123 # internal\nQUOTED_KEY_J="abc # def"',
    );
    loadEnv(envFile);
    expect(process.env.SECRET_KEY_J).toBe("123");
    expect(process.env.QUOTED_KEY_J).toBe("abc # def");
    if (fs.existsSync(envFile)) fs.unlinkSync(envFile);
  });
});

describe("one-configurator-4-all Core - loadYaml", () => {
  const yamlFile = path.join(__dirname, "test.jest.yml");

  it("should load and parse yaml file", () => {
    fs.writeFileSync(yamlFile, "test: success");
    const result = loadYaml(yamlFile);
    expect(result.test).toBe("success");
    if (fs.existsSync(yamlFile)) fs.unlinkSync(yamlFile);
  });

  it("should return null for non-existent file", () => {
    const result = loadYaml("non-existent.yml");
    expect(result).toBeNull();
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
    expect(getConfig("app.name")).toBe("Purecore");
    expect(getConfig("app.version")).toBe("1.0.0");
    expect(getConfig("db.host")).toBe("localhost");
  });

  it("should return undefined for non-existent paths", () => {
    expect(getConfig("app.timeout")).toBeUndefined();
    expect(getConfig("server.port")).toBeUndefined();
  });
});
