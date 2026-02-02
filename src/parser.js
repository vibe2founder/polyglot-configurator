/**
 * Auxiliar para converter tipos primitivos
 * @param {string} value - Valor bruto para parsear
 * @returns {any} Valor tipado
 */
function parseValue(value) {
  if (typeof value !== 'string') return value;
  
  let trimmedValue = value.trim();
  
  // 1. Remove comments respecting quotes
  let inDoubleQuote = false;
  let inSingleQuote = false;
  let commentIndex = -1;

  for (let i = 0; i < trimmedValue.length; i++) {
    const char = trimmedValue[i];
    
    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    } else if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '#' && !inDoubleQuote && !inSingleQuote) {
      commentIndex = i;
      break;
    }
  }

  if (commentIndex !== -1) {
    trimmedValue = trimmedValue.substring(0, commentIndex).trim();
  }

  // 2. Process quotes after comment removal
  const isQuoted =
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"));

  if (isQuoted) {
    return trimmedValue.slice(1, -1);
  }

  // 3. Process primitives
  if (trimmedValue === "true") return true;
  if (trimmedValue === "false") return false;
  if (trimmedValue === "null") return null;
  if (trimmedValue === "") return "";
  
  const num = Number(trimmedValue);
  if (!isNaN(num) && trimmedValue !== "") return num;
  
  return trimmedValue;

/**
 * Converte string YAML simplificada para Objeto JSON (Sem dependências de IO)
 */
function parseYaml(yamlString) {
  if (!yamlString) return {};
  const lines = yamlString.split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, obj: root, parent: null, key: null }];
  
  // Rastreia se o último item inserido num array foi um objeto, para permitir mesclagem
  let lastArrayItem = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indent = line.search(/\S/);
    const trimmed = line.trim();

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
      lastArrayItem = null;
    }

    let currentContext = stack[stack.length - 1];

    if (trimmed.startsWith("- ")) {
      const valueStr = trimmed.substring(2).trim();
      
      if (!Array.isArray(currentContext.obj)) {
        if (Object.keys(currentContext.obj).length === 0 && currentContext.parent) {
          currentContext.obj = [];
          currentContext.parent[currentContext.key] = currentContext.obj;
        } else {
          continue;
        }
      }

      // Verifica se o item do array é um par chave-valor: "- key: value"
      const kvMatch = valueStr.match(/^([^:]+):\s*(.*)$/);
      if (kvMatch) {
        const k = kvMatch[1].trim();
        const v = kvMatch[2].trim();
        const newObj = {};
        if (v === "") {
          // nested object within array item
          currentContext.obj.push({ [k]: newObj });
          stack.push({ indent: indent + 2, obj: newObj, parent: currentContext.obj[currentContext.obj.length - 1], key: k });
          lastArrayItem = newObj;
        } else {
          const item = { [k]: parseValue(v) };
          currentContext.obj.push(item);
          lastArrayItem = item;
        }
      } else {
        currentContext.obj.push(parseValue(valueStr));
        lastArrayItem = null;
      }
      continue;
    }

    const match = trimmed.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      const valueStr = match[2].trim();

      if (Array.isArray(currentContext.obj)) {
        // Se estamos num array e recebemos uma chave SEM traço, 
        // talvez pertença ao último objeto criado pelo traço acima.
        if (lastArrayItem && typeof lastArrayItem === 'object') {
           if (valueStr === "") {
             const newObj = {};
             lastArrayItem[key] = newObj;
             stack.push({ indent, obj: newObj, parent: lastArrayItem, key });
           } else {
             lastArrayItem[key] = parseValue(valueStr);
           }
           continue;
        } else {
           // Fallback: cria um novo objeto se não houver um pra anexar
           const item = {};
           currentContext.obj.push(item);
           if (valueStr === "") {
             const newObj = {};
             item[key] = newObj;
             stack.push({ indent, obj: newObj, parent: item, key });
           } else {
             item[key] = parseValue(valueStr);
           }
           continue;
        }
      }

      if (valueStr === "") {
        const newObj = {};
        currentContext.obj[key] = newObj;
        stack.push({ indent, obj: newObj, parent: currentContext.obj, key });
      } else {
        currentContext.obj[key] = parseValue(valueStr);
      }
    }
  }

  return root;
}

/**
 * Converte string .env para Objeto JSON (Sem dependências de IO)
 */
function parseEnv(content) {
  const result = {};
  if (!content) return result;

  content.split(/\r?\n/).forEach((line) => {
    const cleanLine = line.trim();
    if (!cleanLine || cleanLine.startsWith("#")) return;

    const separatorIndex = cleanLine.indexOf("=");
    if (separatorIndex === -1) return;

    const key = cleanLine.substring(0, separatorIndex).trim();
    const value = cleanLine.substring(separatorIndex + 1).trim();

    result[key] = parseValue(value);
  });
  return result;
}

module.exports = { parseYaml, parseEnv, parseValue };
