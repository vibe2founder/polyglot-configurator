export type YamlString = string & { readonly __brand: "YamlString" };
export type EnvString = string & { readonly __brand: "EnvString" };
export type ParsedConfig = Record<string, any>;

/**
 * Auxiliar para converter tipos primitivos
 */
export function parseValue(value: string): any {
  if (typeof value !== 'string') return value;
  
  const trimmedValue = value.trim();
  
  const isQuoted =
    (trimmedValue.startsWith('"') && trimmedValue.endsWith('"')) ||
    (trimmedValue.startsWith("'") && trimmedValue.endsWith("'"));

  if (isQuoted) {
    return trimmedValue.slice(1, -1);
  }

  const hashIndex = trimmedValue.indexOf("#");
  let effectiveValue = trimmedValue;
  if (hashIndex !== -1) {
    effectiveValue = trimmedValue.substring(0, hashIndex).trim();
  }

  if (effectiveValue === "true") return true;
  if (effectiveValue === "false") return false;
  if (effectiveValue === "null") return null;
  if (effectiveValue === "") return "";
  
  const num = Number(effectiveValue);
  if (!isNaN(num) && effectiveValue !== "") return num;
  
  return effectiveValue;
}

/**
 * Converte string YAML simplificada para Objeto JSON
 */
export function parseYaml(yamlString: string): ParsedConfig {
  if (!yamlString) return {};
  const lines = yamlString.split(/\r?\n/);
  const root: ParsedConfig = {};
  const stack: Array<{ indent: number; obj: any; parent: any; key: any }> = [
    { indent: -1, obj: root, parent: null, key: null }
  ];
  
  let lastArrayItem: any = null;

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indent = line.search(/\S/);
    const trimmed = line.trim();

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
      lastArrayItem = null;
    }

    const currentContext = stack[stack.length - 1];

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

      const kvMatch = valueStr.match(/^([^:]+):\s*(.*)$/);
      if (kvMatch) {
        const k = kvMatch[1].trim();
        const v = kvMatch[2].trim();
        const newObj: any = {};
        if (v === "") {
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
           const item: any = {};
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
 * Converte string .env para Objeto JSON
 */
export function parseEnv(content: string): ParsedConfig {
  const result: ParsedConfig = {};
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
