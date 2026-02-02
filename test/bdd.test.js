const { describe, it, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { loadEnv, loadYaml, parseYaml } = require("../src/index");

// Helper to reset env
const initialEnv = { ...process.env };
const restoreEnv = () => {
  process.env = { ...initialEnv };
};

describe("FEATURE: Environment Variable Management", () => {
  const envPath = path.join(__dirname, ".bdd.env");

  afterEach(() => {
    restoreEnv();
    if (fs.existsSync(envPath)) fs.unlinkSync(envPath);
  });

  describe("SCENARIO: Loading variables from a fresh .env file", () => {
    it("GIVEN a .env file with API_KEY and DEBUG settings\n     WHEN the environment is loaded\n     THEN the variables should be available in process.env", () => {
      // Given
      const content = `API_KEY=12345\nDEBUG=true\nAPP_NAME="My App"`;
      fs.writeFileSync(envPath, content);

      // When
      loadEnv(envPath);

      // Then
      assert.strictEqual(process.env.API_KEY, "12345");
      assert.strictEqual(process.env.DEBUG, "true"); // Note: loadEnv puts strings in process.env usually, but parser returns typed. Wait. 
      // loadEnv implementation: process.env[key] = value. 
      // process.env stores strings only in Node.js behavior! 
      // My parser returns booleans/numbers.
      // If I assign boolean to process.env[key], Node converts it to string "true".
      // Let's verify this behavior.
      assert.strictEqual(process.env.APP_NAME, "My App");
    });
  });

  describe("SCENARIO: System variables override .env values", () => {
    it("GIVEN a system variable PORT is set to 8080\n     AND a .env file sets PORT to 3000\n     WHEN the environment is loaded\n     THEN process.env.PORT should remain 8080", () => {
      // Given
      process.env.PORT = "8080";
      fs.writeFileSync(envPath, "PORT=3000");

      // When
      loadEnv(envPath);

      // Then
      assert.strictEqual(process.env.PORT, "8080");
    });
  });

  describe("SCENARIO: Parsing complex .env values", () => {
    it("GIVEN a .env file with comments and quoted values containing #\n     WHEN loaded\n     THEN it should parse the values correctly ignoring comments", () => {
      // Given
      const content = `
        # This is a comment
        DB_HOST=localhost
        DB_PASS="secret#password" # Inline comment should be ignored
        FLAGS=null
      `;
      fs.writeFileSync(envPath, content);

      // When
      loadEnv(envPath);

      // Then
      assert.strictEqual(process.env.DB_HOST, "localhost");
      assert.strictEqual(process.env.DB_PASS, "secret#password");
    });
  });
});

describe("FEATURE: YAML Configuration Loading", () => {
  const yamlPath = path.join(__dirname, "config.bdd.yaml");

  afterEach(() => {
    if (fs.existsSync(yamlPath)) fs.unlinkSync(yamlPath);
  });

  describe("SCENARIO: Loading a valid Application Configuration", () => {
    it("GIVEN a comprehensive yaml config file\n     WHEN loaded\n     THEN it should return a fully typed javascript object", () => {
      // Given
      const yamlContent = `
server:
  port: 8080
  host: "0.0.0.0"
  cors: true
features:
  - login
  - "registration"
database:
  connection:
    max_pool: 10
    timeout: 5000
    ssl: false
      `;
      fs.writeFileSync(yamlPath, yamlContent);

      // When
      const config = loadYaml(yamlPath);

      // Then
      assert.strictEqual(config.server.port, 8080);
      assert.strictEqual(config.server.cors, true);
      assert.strictEqual(config.features[0], "login");
      assert.strictEqual(config.features[1], "registration");
      assert.strictEqual(config.database.connection.max_pool, 10);
      assert.strictEqual(config.database.connection.ssl, false);
    });
  });

  describe("SCENARIO: Handling Lists of Objects", () => {
    it("GIVEN a yaml list of objects\n     WHEN parsed\n     THEN it should produce an array of objects", () => {
      // Given
      const yamlContent = `
users:
  - name: admin
    role: superuser
  - name: guest
    role: viewer
      `;
      fs.writeFileSync(yamlPath, yamlContent);

      // When
      const config = loadYaml(yamlPath);

      // Then
      assert.ok(Array.isArray(config.users));
      assert.strictEqual(config.users.length, 2);
      assert.strictEqual(config.users[0].name, "admin");
      assert.strictEqual(config.users[0].role, "superuser");
      assert.strictEqual(config.users[1].name, "guest");
    });
  });
});
