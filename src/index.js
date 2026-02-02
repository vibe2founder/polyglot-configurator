const fs = require("fs");
const path = require("path");
const { parseYaml, parseEnv } = require("./parser");

/**
 * Carrega variáveis de ambiente de um arquivo .env local para o process.env
 * @param {string} filePath - Caminho do arquivo (padrão: .env)
 * @returns {Object} Variáveis carregadas
 */
function loadEnv(filePath = ".env") {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(absolutePath)) {
      console.warn(
        `[EnvLoader] Arquivo ${filePath} não encontrado. Usando variáveis do sistema.`,
      );
      return {};
    }

    const content = fs.readFileSync(absolutePath, "utf8");
    const parsed = parseEnv(content);

    Object.entries(parsed).forEach(([key, value]) => {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });

    console.log(`[EnvLoader] Variáveis de ${filePath} carregadas!`);
    return parsed;
  } catch (error) {
    console.error(`[EnvLoader] Erro ao ler ${filePath}:`, error.message);
    return {};
  }
}

/**
 * Lê um arquivo YAML e retorna o objeto JSON
 */
function loadYaml(filePath) {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(absolutePath)) return null;

    const content = fs.readFileSync(absolutePath, "utf8");
    return parseYaml(content);
  } catch (e) {
    console.error(`[EnvLoader] Erro ao carregar YAML ${filePath}:`, e.message);
    return null;
  }
}

module.exports = { loadEnv, loadYaml, parseYaml, parseEnv };
