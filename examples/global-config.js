const fs = require("fs");
const path = require("path");
const { loadEnv, loadYaml } = require("../src/index");

/**
 * Carrega arquivo JSON
 */
function loadJson(filePath) {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(absolutePath)) return null;

    const content = fs.readFileSync(absolutePath, "utf8");
    return JSON.parse(content);
  } catch (e) {
    console.error(
      `[GlobalConfig] Erro ao carregar JSON ${filePath}:`,
      e.message
    );
    return null;
  }
}

/**
 * Carrega todas as configurações e as torna globais
 */
function loadGlobalConfig() {
  console.log(
    "[GlobalConfig] Iniciando carregamento das configurações globais...\n"
  );

  // 1. Carregar variáveis de ambiente (.env)
  console.log("📄 Carregando variáveis de ambiente (.env)...");
  loadEnv("./examples/.env");

  // 2. Carregar configuração YAML
  console.log("📄 Carregando configuração YAML (config.yml)...");
  const yamlConfig = loadYaml(path.join(__dirname, "config.yml"));

  // 3. Carregar configuração JSON
  console.log("📄 Carregando configuração JSON (config.json)...");
  const jsonConfig = loadJson(path.join(__dirname, "config.json"));

  // 4. Criar objeto global de configurações
  global.CONFIG = {
    env: process.env,
    yaml: yamlConfig,
    json: jsonConfig,
    // Merge de todas as configurações (JSON tem prioridade sobre YAML)
    all: {
      ...yamlConfig,
      ...jsonConfig,
      // Sobrescrever com variáveis de ambiente quando disponíveis
      app: {
        ...yamlConfig?.app,
        ...jsonConfig?.app,
        port: process.env.PORT
          ? parseInt(process.env.PORT)
          : jsonConfig?.app?.port || yamlConfig?.app?.port,
        debug: process.env.DEBUG
          ? process.env.DEBUG === "true"
          : jsonConfig?.app?.debug || yamlConfig?.app?.debug,
        environment:
          process.env.NODE_ENV ||
          jsonConfig?.app?.environment ||
          yamlConfig?.app?.environment,
      },
      database: {
        ...yamlConfig?.database,
        ...jsonConfig?.database,
        port: process.env.DATABASE_URL
          ? undefined
          : jsonConfig?.database?.port || yamlConfig?.database?.port,
        url: process.env.DATABASE_URL || undefined,
      },
      api: {
        ...yamlConfig?.api,
        ...jsonConfig?.api,
        baseUrl:
          process.env.API_URL ||
          jsonConfig?.api?.baseUrl ||
          yamlConfig?.api?.baseUrl,
      },
      auth: {
        ...yamlConfig?.auth,
        ...jsonConfig?.auth,
        jwt: {
          ...yamlConfig?.auth?.jwt,
          ...jsonConfig?.auth?.jwt,
          secret:
            process.env.JWT_SECRET ||
            jsonConfig?.auth?.jwt?.secret ||
            yamlConfig?.auth?.jwt?.secret,
        },
      },
      cache: {
        ...yamlConfig?.cache,
        ...jsonConfig?.cache,
        redis: {
          ...yamlConfig?.cache?.redis,
          ...jsonConfig?.cache?.redis,
          url: process.env.REDIS_URL || undefined,
        },
      },
      email: {
        ...yamlConfig?.email,
        ...jsonConfig?.email,
        smtp: {
          ...yamlConfig?.email?.smtp,
          ...jsonConfig?.email?.smtp,
          auth: {
            ...yamlConfig?.email?.smtp?.auth,
            ...jsonConfig?.email?.smtp?.auth,
            user:
              process.env.SMTP_USER ||
              jsonConfig?.email?.smtp?.auth?.user ||
              yamlConfig?.email?.smtp?.auth?.user,
            pass:
              process.env.SMTP_PASS ||
              jsonConfig?.email?.smtp?.auth?.pass ||
              yamlConfig?.email?.smtp?.auth?.pass,
          },
        },
      },
      logging: {
        ...yamlConfig?.logging,
        ...jsonConfig?.logging,
        level:
          process.env.LOG_LEVEL ||
          jsonConfig?.logging?.level ||
          yamlConfig?.logging?.level,
      },
    },
  };

  console.log("\n✅ Configurações globais carregadas com sucesso!");
  console.log("📊 Resumo das configurações carregadas:");
  console.log(
    `   • Variáveis de ambiente: ${
      Object.keys(process.env).filter(
        (key) =>
          key.startsWith("NODE_ENV") ||
          key.startsWith("PORT") ||
          key.startsWith("DEBUG") ||
          key.startsWith("API_") ||
          key.startsWith("DATABASE_") ||
          key.startsWith("JWT_") ||
          key.startsWith("REDIS_") ||
          key.startsWith("SMTP_") ||
          key.startsWith("LOG_") ||
          key.startsWith("MAX_") ||
          key.startsWith("TIMEOUT")
      ).length
    } variáveis`
  );
  console.log(
    `   • Configuração YAML: ${yamlConfig ? "Carregada" : "Não encontrada"}`
  );
  console.log(
    `   • Configuração JSON: ${jsonConfig ? "Carregada" : "Não encontrada"}`
  );
  console.log("\n🔧 Configurações disponíveis globalmente via global.CONFIG");
}

// Função auxiliar para obter configuração específica
global.getConfig = (path) => {
  if (!global.CONFIG || !global.CONFIG.all) {
    console.warn(
      `[Configify] Atenção: Tentando obter '${path}' mas as configurações globais não foram carregadas. Chame loadGlobalConfig() primeiro.`
    );
    return undefined;
  }

  const keys = path.split(".");
  let current = global.CONFIG.all;

  for (const key of keys) {
    if (current && typeof current === "object") {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
};

// Executar automaticamente se chamado diretamente
if (require.main === module) {
  loadGlobalConfig();
}

// Exportar função principal
module.exports = { loadGlobalConfig, loadJson };
