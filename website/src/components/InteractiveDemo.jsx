import React, { useState } from 'react';

const InteractiveDemo = () => {
  const [yamlInput, setYamlInput] = useState(`app:
  name: MyApp
  version: 1.0.0
  port: 3000
  debug: true
  features:
    - auth
    - api
    - dashboard`);

  const [parsedOutput, setParsedOutput] = useState('');
  const [envInput, setEnvInput] = useState(`PORT=3000
DEBUG=true
TIMEOUT=5000
API_KEY="sk-123456789"
DATABASE_URL="postgresql://user:pass@localhost/db"`);

  const [envOutput, setEnvOutput] = useState('');

  const parseYaml = (yamlString) => {
    // This is a simplified YAML parser for demonstration purposes
    // In a real implementation, we would use the actual Configify library
    try {
      const lines = yamlString.split(/\r?\n/);
      const root = {};
      const stack = [{ indent: -1, obj: root, parent: null, key: null }];

      for (const line of lines) {
        if (!line.trim() || line.trim().startsWith("#")) continue;

        const indent = line.search(/\S/);
        const trimmed = line.trim();

        while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
          stack.pop();
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

          currentContext.obj.push(parseValue(valueStr));
          continue;
        }

        const match = trimmed.match(/^([^:]+):\s*(.*)$/);
        if (match) {
          const key = match[1].trim();
          const valueStr = match[2].trim();

          if (valueStr === "") {
            const newObj = {};
            if (Array.isArray(currentContext.obj)) {
              currentContext.obj.push({ [key]: newObj });
            } else {
              currentContext.obj[key] = newObj;
            }
            stack.push({ indent, obj: newObj, parent: currentContext.obj, key });
          } else {
            if (Array.isArray(currentContext.obj)) {
              currentContext.obj.push({ [key]: parseValue(valueStr) });
            } else {
              currentContext.obj[key] = parseValue(valueStr);
            }
          }
        }
      }

      return root;
    } catch (e) {
      return { error: e.message };
    }
  };

  const parseValue = (value) => {
    const isQuoted = 
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));

    if (isQuoted) {
      return value.slice(1, -1);
    }

    const hashIndex = value.indexOf("#");
    if (hashIndex !== -1) {
      value = value.substring(0, hashIndex).trim();
    }

    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;
    if (!isNaN(Number(value)) && value !== "") return Number(value);
    return value;
  };

  const parseEnv = (envString) => {
    const result = {};
    envString.split(/\r?\n/).forEach(line => {
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
        const hashIndex = value.indexOf("#");
        if (hashIndex !== -1) {
          value = value.substring(0, hashIndex).trim();
        }
      }

      result[key] = value;
    });
    return result;
  };

  const handleYamlParse = () => {
    const result = parseYaml(yamlInput);
    setParsedOutput(JSON.stringify(result, null, 2));
  };

  const handleEnvParse = () => {
    const result = parseEnv(envInput);
    setEnvOutput(JSON.stringify(result, null, 2));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Try Configify Live</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* YAML Parser Demo */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-700">YAML Parser</h4>
          <textarea
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
            className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
            placeholder="Enter YAML here..."
          />
          <button
            onClick={handleYamlParse}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Parse YAML
          </button>
          <div className="mt-4">
            <h5 className="font-medium text-gray-700 mb-2">Parsed Result:</h5>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {parsedOutput || '// Click "Parse YAML" to see result'}
            </pre>
          </div>
        </div>
        
        {/* ENV Parser Demo */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-700">ENV Parser</h4>
          <textarea
            value={envInput}
            onChange={(e) => setEnvInput(e.target.value)}
            className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
            placeholder="Enter environment variables here..."
          />
          <button
            onClick={handleEnvParse}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Parse ENV
          </button>
          <div className="mt-4">
            <h5 className="font-medium text-gray-700 mb-2">Parsed Result:</h5>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {envOutput || '// Click "Parse ENV" to see result'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;