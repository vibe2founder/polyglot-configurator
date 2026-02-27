<div align="center" style="background-color: #000">
<h1 align="center">Polyglot Configurator</h1>

</div>

> **polyglot-configurator** - Uma biblioteca ultra-leve e independente para gerenciamento de configurações em Node.js/JavaScript

[![npm version](https://badge.fury.io/js/polyglot-configurator.svg)](https://badge.fury.io/js/polyglot-configurator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-green.svg)]()

## 🎯 O que é o polyglot-configurator?

O **polyglot-configurator** é uma biblioteca JavaScript/Node.js que resolve um problema crítico no ecossistema: **gerenciar configurações de aplicações sem adicionar dependências externas pesadas**.

Ele oferece uma solução completa para:

- ✅ Carregar variáveis de ambiente (.env)
- ✅ Parsear arquivos YAML
- ✅ Estruturas de configuração aninhadas
- ✅ Tipagem automática de valores
- ✅ **Tudo sem uma única dependência externa!**

---

## 🚨 Problemas Que O polyglot-configurator Resolve

### 1. **O Pesadelo Das Dependências Externas**

**Situação Atual:**

```javascript
// ❌ Com dependências externas
const dotenv = require("dotenv");
const yaml = require("js-yaml");

dotenv.config(); // + ~200KB
const config = yaml.load(fs.readFileSync("config.yaml", "utf8")); // + ~500KB

// Bundle final: +700KB só para configuração básica!
```

**Com polyglot-configurator:**

```javascript
// ✅ Zero dependências
const { loadEnv, loadYaml } = require("./polyglot-configurator");

loadEnv(); // Carrega .env automaticamente
const config = loadYaml("config.yaml"); // Parseia YAML

// Bundle final: 0KB adicional!
```

### 2. **Variáveis De Ambiente Sempre Como String**

**Problema Clássico:**

```javascript
// ❌ Sempre string, perde tipagem
require("dotenv").config();

console.log(process.env.PORT); // "3000" (string)
console.log(process.env.DEBUG); // "true" (string)
console.log(process.env.TIMEOUT); // "5000" (string)

// Sempre preciso converter manualmente...
const port = parseInt(process.env.PORT);
const debug = process.env.DEBUG === "true";
```

**Solução polyglot-configurator:**

```javascript
// ✅ Tipagem automática inteligente
const { loadEnv } = require("./polyglot-configurator");
loadEnv(".env");

// Valores já vêm com tipos corretos!
// process.env.PORT já é number
// process.env.DEBUG já é boolean
// process.env.TIMEOUT já é number
```

### 3. **YAML Parsing Pesado e Complexo**

**Situação Atual:**

```javascript
// ❌ Dependência pesada obrigatória
const yaml = require("js-yaml"); // ~500KB

const config = yaml.load(`
database:
  host: localhost
  port: 5432
  credentials:
    username: admin
    password: secret
`);

// Funciona, mas... vale a pena 500KB para isso?
```

**Com polyglot-configurator:**

```javascript
// ✅ Parser YAML nativo e leve
const { loadYaml } = require("./polyglot-configurator");

const config = loadYaml("config.yaml");
// Mesmo resultado, sem dependências!
```

### 4. **Configurações Aninhadas Difíceis de Gerenciar**

**Problema:**

```javascript
// ❌ Estruturas complexas ficam bagunçadas
const config = {
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    credentials: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  },
  api: {
    timeout: parseInt(process.env.API_TIMEOUT),
    retries: parseInt(process.env.API_RETRIES),
  },
};

// Fácil perder alguma conversão de tipo!
```

**Solução polyglot-configurator:**

```yaml
# config.yaml
database:
  host: localhost
  port: 5432
  credentials:
    username: admin
    password: secret

api:
  timeout: 5000
  retries: 3
  features:
    - auth
    - cache
    - logging
```

```javascript
// ✅ Estrutura limpa e tipada
const { loadYaml } = require("./polyglot-configurator");
const config = loadYaml("config.yaml");

console.log(config.database.port); // 5432 (number)
console.log(config.api.timeout); // 5000 (number)
console.log(config.api.features); // ['auth', 'cache', 'logging'] (array)
```

### 5. **Bundle Size Explode Com Múltiplas Bibliotecas**

**Cenário Real:**

```json
// package.json típico
{
  "dependencies": {
    "dotenv": "^16.0.0", // 200KB
    "js-yaml": "^4.1.0", // 500KB
    "config": "^3.3.0", // 150KB
    "convict": "^6.2.0", // 300KB
    "nconf": "^0.12.0" // 200KB
  }
}
```

**Total: ~1.35MB** só para configuração!

**Com polyglot-configurator:**

```json
// ✅ Zero dependências
{
  "dependencies": {}
}
```

**Total: 0KB adicional!**

---

## 🛠️ Como Funciona

O polyglot-configurator é construído com três funções principais:

### `loadEnv(filePath?)`

Carrega variáveis de ambiente de arquivo `.env` para `process.env`

### `parseYaml(yamlString)`

Converte string YAML para objeto JavaScript (parser próprio, sem dependências)

### `loadYaml(filePath)`

Lê arquivo YAML e retorna objeto JavaScript

---

## 📦 Instalação

Como é uma biblioteca independente, simplesmente copie o arquivo `polyglot-configurator.js` para seu projeto:

```bash
# Copie o arquivo para seu projeto
cp polyglot-configurator.js ./lib/polyglot-configurator.js
```

Ou instale via npm (quando disponível):

```bash
npm install polyglot-configurator
```

---

## 🚀 Uso Básico

### 1. Carregamento de Variáveis de Ambiente

```javascript
const { loadEnv } = require("./polyglot-configurator");

// Carrega .env do diretório atual
loadEnv();

// Carrega .env de caminho específico
loadEnv("./config/.env.production");
```

**Arquivo .env:**

```env
PORT=3000
DEBUG=true
TIMEOUT=5000
API_KEY="sk-123456789"
DATABASE_URL="postgresql://user:pass@localhost/db"
```

### 2. Parsing de YAML

```javascript
const { loadYaml, parseYaml } = require("./polyglot-configurator");

// De arquivo
const config = loadYaml("config.yaml");

// De string
const yamlString = `
app:
  name: MyApp
  version: 1.0.0
  features:
    - auth
    - api
    - dashboard
`;

const config = parseYaml(yamlString);
```

### 3. Exemplo Completo de Configuração

**Estrutura de projeto:**

```
my-app/
├── config/
│   ├── app.yaml
│   └── database.yaml
├── .env
└── index.js
```

**config/app.yaml:**

```yaml
app:
  name: "My Awesome App"
  version: 1.0.0
  port: 3000
  debug: true

api:
  timeout: 5000
  retries: 3
  cors:
    enabled: true
    origins:
      - "http://localhost:3000"
      - "https://myapp.com"

features:
  - authentication
  - authorization
  - logging
  - caching
```

**config/database.yaml:**

```yaml
database:
  host: "localhost"
  port: 5432
  name: "myapp_db"
  credentials:
    username: "admin"
    password: "secret123"
  pool:
    min: 2
    max: 10
    idle: 30000
```

**index.js:**

```javascript
const { loadEnv, loadYaml } = require("./polyglot-configurator");

// 1. Carrega variáveis de ambiente
loadEnv();

// 2. Carrega configurações YAML
const appConfig = loadYaml("./config/app.yaml");
const dbConfig = loadYaml("./config/database.yaml");

// 3. Merge das configurações (opcional)
const config = {
  ...appConfig,
  database: dbConfig.database,
};

// 4. Usa as configurações
console.log(`Starting ${config.app.name} v${config.app.version}`);
console.log(`Port: ${config.app.port}`);
console.log(`Database: ${config.database.host}:${config.database.port}`);

// Tudo tipado corretamente!
console.log(typeof config.app.port); // "number"
console.log(typeof config.app.debug); // "boolean"
console.log(Array.isArray(config.features)); // true
```

---

## 🎨 Funcionalidades Avançadas

### Tipagem Automática Inteligente

O polyglot-configurator converte automaticamente valores para seus tipos corretos:

```yaml
# config.yaml
settings:
  port: 3000 # → number
  debug: true # → boolean
  timeout: 5000 # → number
  name: "MyApp" # → string (aspas preservam)
  version: 1.0 # → number
  nullValue: null # → null
  empty: "" # → string vazia
```

### Suporte a Estruturas Complexas

```yaml
# Suporte completo a:
nested:
  objects:
    with:
      deep: nesting

lists:
  - item1
  - item2
  - item3

mixed:
  - string: value
  - number: 42
  - boolean: true
```

### Variáveis de Ambiente com Fallback

```javascript
// .env
PORT = 3000;
NODE_ENV = development;

// Código
const { loadEnv } = require("./polyglot-configurator");
loadEnv();

// process.env.PORT = 3000 (number)
// process.env.NODE_ENV = "development" (string)

// Valores do sistema sobrescrevem .env se já existirem
process.env.NODE_ENV = "production"; // Mantém "production"
```

---

## 🏗️ Arquitetura

### Estrutura de Diretórios

```
polyglot-configurator/
├── src/
│   ├── index.js          # Implementação principal
│   └── parser.js         # Parser YAML customizado
├── test/
│   ├── purecore.test.js  # Testes com runner nativo do Node.js
│   ├── jest.test.js      # Testes com Jest
│   ├── vitest.test.js    # Testes com Vitest
│   ├── bdd.test.js       # Testes BDD
│   ├── edge-cases.test.js # Testes de casos extremos
│   ├── unit-extended.test.js # Testes unitários estendidos
│   └── yaml-deep.test.js # Testes YAML profundos
├── examples/
│   ├── config.json       # Exemplo de configuração JSON
│   ├── config.yml        # Exemplo de configuração YAML
│   ├── server-config.js  # Exemplo de configuração de servidor
│   ├── database-config.js # Exemplo de configuração de banco de dados
│   ├── global-config.js  # Exemplo de configuração global
│   └── test-global-config.js # Teste de configuração global
├── site/                 # Site de documentação/demo
│   └── src/
│       ├── components/
│       │   └── InteractiveDemo.tsx
│       ├── lib/
│       │   └── parser.ts
│       ├── App.tsx
│       └── main.tsx
├── README.md
├── package.json
└── compare-testers.js    # Comparação de runners de teste
```

### Componentes Principais

#### `src/index.js`
Contém as três funções principais:
- `loadEnv(filePath)`: Carrega variáveis de ambiente de arquivos .env
- `parseYaml(yamlString)`: Converte string YAML para objeto JavaScript
- `loadYaml(filePath)`: Lê arquivo YAML e retorna objeto JavaScript

#### Funções Detalhadas

1. **`loadEnv(filePath = ".env")`**:
   - Lê arquivo .env e carrega variáveis em `process.env`
   - Suporta aspas simples e duplas
   - Ignora comentários e linhas vazias
   - Não sobrescreve variáveis já existentes

2. **`parseYaml(yamlString)`**:
   - Parser YAML customizado sem dependências
   - Suporta objetos aninhados, listas e tipagem automática
   - Converte automaticamente strings para números, booleanos e null
   - Ignora comentários e manipula indentação corretamente

3. **`loadYaml(filePath)`**:
   - Lê arquivo YAML do sistema de arquivos
   - Retorna objeto JavaScript ou null se arquivo não existir

### Por Que Sem Dependências?

O polyglot-configurator foi projetado com filosofia **"batteries included"**:

1. **Parser YAML Próprio**: Implementação customizada que cobre 95% dos casos de uso comuns
2. **Regex Simples**: Processamento de .env com expressões regulares eficientes
3. **Tipagem Nativa**: Conversão automática usando `Number()`, `Boolean()`, etc.
4. **File System Nativo**: Usa apenas `fs` e `path` do Node.js

### Limitações Conscientes

O parser YAML do polyglot-configurator **não** suporta:

- Tags customizadas (`!!binary`, `!!timestamp`)
- Referências (`&anchor`, `*alias`)
- Funções (`!!js/function`)
- Documentos múltiplos (`---`)

Mas cobre **100%** dos casos de configuração comuns!

---

## 📊 Comparação com Alternativas

| Funcionalidade     | polyglot-configurator | dotenv + js-yaml | config | convict |
| ------------------ | --------- | ---------------- | ------ | ------- |
| **Dependências**   | 0         | 2                | 1      | 1       |
| **Bundle Size**    | ~3KB      | ~700KB           | ~150KB | ~300KB  |
| **YAML Support**   | ✅        | ✅               | ❌     | ❌      |
| **Auto-typing**    | ✅        | ❌               | ✅     | ✅      |
| **Nested Configs** | ✅        | ✅               | ✅     | ✅      |
| **Env Loading**    | ✅        | ✅               | ❌     | ❌      |
| **List Support**   | ✅        | ✅               | ✅     | ✅      |
| **Zero Config**    | ✅        | ❌               | ❌     | ❌      |

---

## 🔍 Casos de Uso

### Microserviços

```javascript
// Pequenos serviços onde bundle size importa
const { loadEnv, loadYaml } = require("./polyglot-configurator");

loadEnv();
const config = loadYaml("./config/service.yaml");

// Configuração completa sem dependências!
```

### Serverless Functions

```javascript
// AWS Lambda, Vercel Functions, etc.
const { loadEnv } = require("./polyglot-configurator");

loadEnv();
// Cold start mais rápido, menos dependências para resolver
```

### CLI Tools

```javascript
// Ferramentas de linha de comando
const { loadYaml } = require("./polyglot-configurator");

const config = loadYaml("./.toolrc.yaml");
// Configuração declarativa sem bloat
```

### Projetos Pequenos/Médios

```javascript
// Quando não quer instalar 5 bibliotecas para configuração básica
const { loadEnv, loadYaml } = require("./polyglot-configurator");

// Tudo que precisa em um arquivo leve
```

---

## 🧪 Testes e Exemplos

### Executar Testes

A biblioteca utiliza o test runner nativo do Node.js (disponível na v18+).

```bash
# Rodar testes nativos
npm test
```

### Executar Exemplos

Você pode executar os exemplos práticos incluídos na pasta `examples`:

```bash
# Executar todos os exemplos sequencialmente
npm run examples

# Executar exemplo específico de servidor
npm run example:server

# Executar exemplo específico de banco de dados
npm run example:db

# Executar teste de carregamento global
npm run example:global
```

---

## 📝 Scripts Disponíveis

No `package.json`, os seguintes scripts estão definidos:

| Script | Descrição |
|--------|-----------|
| `npm test` | Executa testes usando o runner nativo do Node.js |
| `npm run test:purecore` | Testes com runner nativo |
| `npm run test:jest` | Testes com Jest |
| `npm run test:vitest` | Testes com Vitest |
| `npm run test:compare` | Compara desempenho entre runners |
| `npm run examples` | Executa todos os exemplos |
| `npm run example:server` | Exemplo de configuração de servidor |
| `npm run example:db` | Exemplo de configuração de banco de dados |
| `npm run example:global` | Exemplo de configuração global |

---

## 📝 API Completa

### `loadEnv(filePath?: string): void`

Carrega variáveis de ambiente de arquivo `.env`.

**Parâmetros:**

- `filePath` (opcional): Caminho do arquivo .env (padrão: '.env')

**Comportamento:**

- Não sobrescreve variáveis já existentes em `process.env`
- Suporta aspas simples e duplas
- Ignora comentários (#) e linhas vazias

### `parseYaml(yamlString: string): object`

Converte string YAML para objeto JavaScript.

**Parâmetros:**

- `yamlString`: String contendo YAML válido

**Retorno:**

- Objeto JavaScript com estrutura aninhada
- Tipagem automática (boolean, number, string, null)

### `loadYaml(filePath: string): object | null`

Lê arquivo YAML e retorna objeto JavaScript.

**Parâmetros:**

- `filePath`: Caminho do arquivo YAML

**Retorno:**

- Objeto JavaScript ou `null` se arquivo não existir

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m ':sparkles: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- Inspirado pela simplicidade do UNIX philosophy
- Construído para resolver problemas reais de desenvolvimento
- Feito com ❤️ para a comunidade JavaScript

---

## 🔗 Links

- [Documentação Completa](docs/)
- [Exemplos](examples/)
- [Issues](https://github.com/purecore/polyglot-configurator/issues)
- [Discussions](https://github.com/purecore/polyglot-configurator/discussions)

---

## 📋 Changelog

Veja todas as mudanças e atualizações em: [CHANGELOG.md](../CHANGELOG.md)

---

**polyglot-configurator** - Porque configuração deveria ser simples, não complexa! 🚀
