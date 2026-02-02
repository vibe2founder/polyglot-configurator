// Exemplo de uso das configurações para configurar um servidor HTTP/API
// Este arquivo demonstra como usar as configurações globais carregadas pelo Configify

// Importar o carregamento global das configurações
const { loadGlobalConfig } = require("./global-config");

// Carregar configurações
loadGlobalConfig();

/**
 * Simula configuração e inicialização do servidor HTTP
 */
async function demonstrateServerConfig() {
  console.log("🚀 Exemplo de Configuração de Servidor/API usando Configify\n");

  // Carregar configurações do servidor
  const serverConfig = {
    port: global.getConfig("app.port") || 3000,
    host: "0.0.0.0", // Sempre localhost para desenvolvimento
    timeout: global.getConfig("api.timeout") || 5000,
    debug: global.getConfig("app.debug") || false,
    environment: global.getConfig("app.environment") || "development",
  };

  // Carregar configurações da API
  const apiConfig = {
    baseUrl: global.getConfig("api.baseUrl") || "http://localhost:3000/api",
    timeout: global.getConfig("api.timeout") || 5000,
    retries: global.getConfig("api.retries") || 3,
    rateLimit: {
      windowMs: global.getConfig("api.rateLimit.windowMs") || 900000,
      max: global.getConfig("api.rateLimit.max") || 100,
    },
  };

  // Carregar configurações de logging
  const loggingConfig = {
    level: global.getConfig("logging.level") || "info",
    format: global.getConfig("logging.format") || "json",
    transports: global.getConfig("logging.transports") || ["console"],
  };

  console.log("📋 Configurações do servidor:");
  console.log(
    JSON.stringify(
      {
        server: {
          ...serverConfig,
          status: "stopped",
          uptime: 0,
        },
        api: apiConfig,
        logging: loggingConfig,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    )
  );
  console.log();

  // Simular inicialização do servidor
  console.log(
    `🚀 Iniciando servidor ${global.getConfig("app.name")} v${global.getConfig(
      "app.version"
    )}...`
  );
  console.log(`   🌍 Ambiente: ${serverConfig.environment}`);
  console.log(`   🔧 Debug: ${serverConfig.debug ? "ativado" : "desativado"}`);
  console.log(`   📡 Porta: ${serverConfig.port}`);
  console.log(`   🏠 Host: ${serverConfig.host}`);
  console.log(`   🔗 Base URL: ${apiConfig.baseUrl}`);

  // Configurar middlewares
  console.log("\n🔧 Configurando middlewares...");
  if (loggingConfig.transports.includes("console")) {
    console.log(
      `   📝 Logging ativado - Nível: ${loggingConfig.level}, Formato: ${loggingConfig.format}`
    );
  }
  console.log(`   ⏱️  Timeout configurado: ${apiConfig.timeout}ms`);
  console.log(
    `   🛡️  Rate Limiting: ${apiConfig.rateLimit.max} requests por ${
      apiConfig.rateLimit.windowMs / 1000
    }s`
  );

  // Configurar rotas
  console.log("\n🛣️  Configurando rotas da API...");
  const routes = [
    { method: "GET", path: "/health", description: "Health check endpoint" },
    { method: "GET", path: "/api/config", description: "Configurações da API" },
    { method: "GET", path: "/api/status", description: "Status do servidor" },
    { method: "POST", path: "/api/data", description: "Endpoint de dados" },
  ];

  routes.forEach((route) => {
    console.log(`   ${route.method} ${route.path} - ${route.description}`);
  });
  console.log();

  // Simular inicialização
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log(
    `✅ Servidor iniciado com sucesso em http://${serverConfig.host}:${serverConfig.port}`
  );
  console.log(`🔗 API disponível em: ${apiConfig.baseUrl}`);

  console.log("\n🧪 Testando endpoints da API...\n");

  // Testar alguns endpoints
  await simulateRequest("/health", "GET");
  await simulateRequest("/api/status", "GET");
  await simulateRequest("/api/config", "GET");

  // Aguardar um pouco e parar servidor
  setTimeout(() => {
    console.log("\n🛑 Parando servidor...");
    console.log("✅ Servidor parado com sucesso!");
    console.log("\n🏁 Exemplo de servidor concluído!");
  }, 3000);
}

/**
 * Simula uma requisição à API
 */
async function simulateRequest(endpoint, method = "GET") {
  console.log(`📨 Simulando ${method} ${endpoint}...`);

  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = {
        "/health": { status: "ok", timestamp: new Date().toISOString() },
        "/api/config": {
          server: "running",
          environment: global.getConfig("app.environment"),
          version: global.getConfig("app.version"),
        },
        "/api/status": {
          server: "running",
          environment: global.getConfig("app.environment"),
          version: global.getConfig("app.version"),
        },
        "/api/data": {
          data: "Sample data from API",
          timestamp: new Date().toISOString(),
        },
      };

      const response = responses[endpoint] || { error: "Endpoint not found" };
      console.log(`   ✅ Resposta: ${JSON.stringify(response)}`);
      resolve(response);
    }, 100); // Simular latência da API
  });
}

// Executar exemplo se chamado diretamente
if (require.main === module) {
  demonstrateServerConfig().catch(console.error);
}

module.exports = { demonstrateServerConfig };
