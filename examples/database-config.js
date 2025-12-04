// Exemplo de uso das configurações para conectar ao MongoDB
// Este arquivo demonstra como usar as configurações globais carregadas pelo Configify

// Importar o carregamento global das configurações
require("./global-config");

/**
 * Função para montar a string de conexão do MongoDB
 */
function buildConnectionString(config) {
  // Se já tem URL completa, usar ela
  if (config.url) {
    return config.url;
  }

  // Montar URL baseada nas configurações individuais
  const auth = config.username && config.password
    ? `${config.username}:${config.password}@`
    : "";

  return `mongodb://${auth}${config.host}:${config.port}/${config.name}`;
}

/**
 * Simula conexão com o banco de dados
 */
async function simulateConnection(appConfig) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simular falha em desenvolvimento se debug estiver ativo
      if (appConfig.debug && Math.random() < 0.1) {
        reject(new Error("Simulated connection error for testing"));
      } else {
        resolve({ connected: true });
      }
    }, 100); // Simular latência de conexão
  });
}

/**
 * Função principal para demonstrar configuração de banco de dados
 */
async function demonstrateDatabaseConfig() {
  console.log("🚀 Exemplo de Configuração de Banco de Dados usando Configify\n");

  // Carregar configurações do banco usando getConfig
  const dbConfig = {
    host: global.getConfig("database.host") || "localhost",
    port: global.getConfig("database.port") || 27017,
    name: global.getConfig("database.name") || "myapp",
    username: global.getConfig("database.username") || "",
    password: global.getConfig("database.password") || "",
    maxConnections: global.getConfig("database.maxConnections") || 100,
    timeout: global.getConfig("database.timeout") || 5000,
    url: global.getConfig("database.url")
  };

  // Carregar configurações da aplicação
  const appConfig = {
    name: global.getConfig("app.name") || "My App",
    version: global.getConfig("app.version") || "1.0.0",
    environment: global.getConfig("app.environment") || "development",
    debug: global.getConfig("app.debug") || false
  };

  console.log("📋 Configurações carregadas:");
  console.log(JSON.stringify({
    database: {
      ...dbConfig,
      password: dbConfig.password ? "****" : "", // Oculta senha
      url: dbConfig.url ? dbConfig.url.replace(/:([^:@]{4})[^:@]*@/, ":****@") : undefined
    },
    app: appConfig,
    connection: {
      status: "disconnected",
      timestamp: new Date().toISOString()
    }
  }, null, 2));
  console.log();

  // Tentar conectar
  try {
    const connectionString = buildConnectionString(dbConfig);

    console.log(`🔌 Conectando ao MongoDB...`);
    console.log(`   📍 URL: ${connectionString.replace(/:([^:@]{4})[^:@]*@/, ":****@")}`); // Oculta senha
    console.log(`   ⏱️  Timeout: ${dbConfig.timeout}ms`);
    console.log(`   🔢 Max Connections: ${dbConfig.maxConnections}`);

    // Simulação de conexão (em produção usaria mongoose ou mongodb driver)
    await simulateConnection(appConfig);

    console.log(`✅ Conectado ao banco de dados "${dbConfig.name}" com sucesso!`);

    // Simular algumas operações
    console.log("\n📊 Status da conexão:");
    console.log(`   Status: ✅ Conectado`);

    // Aguardar um pouco e "desconectar"
    setTimeout(() => {
      console.log(`🔌 Desconectando do banco de dados...`);
      console.log(`✅ Desconectado com sucesso!`);
      console.log("\n🏁 Exemplo concluído!");
    }, 2000);

  } catch (error) {
    console.error(`❌ Erro ao conectar ao banco de dados:`, error.message);
  }
}

// Executar exemplo se chamado diretamente
if (require.main === module) {
  demonstrateDatabaseConfig().catch(console.error);
}

module.exports = { demonstrateDatabaseConfig };
