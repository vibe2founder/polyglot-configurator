const fs = require("fs");
const path = require("path");

/**
 * Carrega variáveis de ambiente de um arquivo .env local para o process.env
 * @param {string} filePath - Caminho do arquivo (padrão: .env)
 */
function loadEnv(filePath = ".env") {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(absolutePath)) {
      console.warn(
        `[EnvLoader] Arquivo ${filePath} não encontrado. Usando variáveis do sistema.`
      );
      return;
    }

    const content = fs.readFileSync(absolutePath, "utf8");

    content.split(/\r?\n/).forEach((line) => {
      const cleanLine = line.trim();
      if (!cleanLine || cleanLine.startsWith("#")) return;

      const separatorIndex = cleanLine.indexOf("=");
      if (separatorIndex === -1) return;

      const key = cleanLine.substring(0, separatorIndex).trim();
      let value = cleanLine.substring(separatorIndex + 1).trim();

      const isQuoted =
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"));

      if (isQuoted) {
        value = value.slice(1, -1);
      } else {
        // Remove comentários inline se não estiver entre aspas
        const hashIndex = value.indexOf("#");
        if (hashIndex !== -1) {
          value = value.substring(0, hashIndex).trim();
        }
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    });

    console.log(`[EnvLoader] Variáveis de ${filePath} carregadas!`);
  } catch (error) {
    console.error(`[EnvLoader] Erro ao ler ${filePath}:`, error.message);
  }
}

/**
 * Converte string YAML simplificada para Objeto JSON (Sem dependências)
 * Suporta: Chave: Valor, Aninhamento (Indentação) e Listas (-)
 */
function parseYaml(yamlString) {
  const lines = yamlString.split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, obj: root, parent: null, key: null }];

  for (const line of lines) {
    // Ignora comentários e linhas vazias
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indent = line.search(/\S/);
    const trimmed = line.trim();

    // Ajusta a pilha baseada na indentação (voltar níveis se necessário)
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    let currentContext = stack[stack.length - 1];

    // Verifica se é item de lista "- valor"
    if (trimmed.startsWith("- ")) {
      const valueStr = trimmed.substring(2).trim();

      // Se o contexto atual não for array, tenta promover
      if (!Array.isArray(currentContext.obj)) {
        if (
          Object.keys(currentContext.obj).length === 0 &&
          currentContext.parent
        ) {
          currentContext.obj = [];
          currentContext.parent[currentContext.key] = currentContext.obj;
        } else {
          continue; // Ignora se já tiver chaves e não for array
        }
      }

      currentContext.obj.push(parseValue(valueStr));
      continue;
    }

    // Verifica formato "chave: valor"
    const match = trimmed.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      const valueStr = match[2].trim();

      if (valueStr === "") {
        // É um objeto ou lista aninhada
        const newObj = {};
        if (Array.isArray(currentContext.obj)) {
          currentContext.obj.push({ [key]: newObj });
        } else {
          currentContext.obj[key] = newObj;
        }
        stack.push({ indent, obj: newObj, parent: currentContext.obj, key });
      } else {
        // É um valor escalar
        if (Array.isArray(currentContext.obj)) {
          // Array de objetos chave-valor numa linha só? Raro em configs simples
          currentContext.obj.push({ [key]: parseValue(valueStr) });
        } else {
          currentContext.obj[key] = parseValue(valueStr);
        }
      }
    }
  }

  return root;
}

/**
 * Auxiliar para converter tipos primitivos
 */
function parseValue(value) {
  const isQuoted =
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"));

  if (isQuoted) {
    return value.slice(1, -1);
  }

  // Remove comentários inline (geralmente precedidos por espaço em YAML)
  const hashIndex = value.indexOf("#");
  if (hashIndex !== -1) {
    value = value.substring(0, hashIndex).trim();
  }

  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (!isNaN(Number(value)) && value !== "") return Number(value);
  return value;
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

// Exporta como objeto agora
module.exports = { loadEnv, loadYaml, parseYaml };
