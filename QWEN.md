# Projeto: one-configurator-4-all (Configify)

## Visão Geral

O **one-configurator-4-all**, também conhecido como **Configify**, é uma biblioteca JavaScript/Node.js ultra-leve e independente para gerenciamento de configurações. A principal característica deste projeto é que ele oferece funcionalidades completas de carregamento e parsing de configurações sem depender de nenhuma biblioteca externa, mantendo o tamanho do bundle mínimo.

## Propósito

O projeto resolve problemas comuns no ecossistema JavaScript/Node.js relacionados ao gerenciamento de configurações:

1. **Dependências pesadas**: Muitas bibliotecas de configuração adicionam centenas de KB ao bundle
2. **Tipagem incorreta**: Variáveis de ambiente são sempre strings, perdendo tipagem
3. **Parsing YAML complexo**: Bibliotecas YAML tradicionais são muito grandes para uso básico
4. **Complexidade desnecessária**: Muitas opções e recursos que a maioria dos projetos não precisa

## Arquitetura

### Estrutura de Diretórios
```
one-configurator-4-all/
├── src/
│   └── index.js (implementação principal)
├── test/
│   ├── purecore.test.js (testes com runner nativo do Node.js)
│   ├── jest.test.js
│   └── vitest.test.js
├── examples/
│   ├── config.json
│   ├── config.yml
│   ├── server-config.js
│   ├── database-config.js
│   └── global-config.js
├── README.md
├── package.json
└── compare-testers.js
```

### Componentes Principais

#### src/index.js
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

## Funcionalidades

### Tipagem Automática Inteligente
- Converte automaticamente valores para seus tipos corretos (number, boolean, null)
- Preserva strings entre aspas
- Suporta estruturas complexas (objetos aninhados, arrays)

### Suporte a Múltiplos Formatadores
- Carregamento de variáveis de ambiente (.env)
- Parsing de arquivos YAML
- Leitura opcional de arquivos JSON

### Estratégia de Zero Dependências
- Implementação própria de parser YAML
- Uso de módulos nativos do Node.js (fs, path)
- Tamanho reduzido (~3KB) comparado a alternativas

## Testes

O projeto inclui testes para verificar o funcionamento correto das funções principais:
- Testes unitários para parsing de YAML
- Testes para carregamento de variáveis de ambiente
- Testes para leitura de arquivos YAML
- Comparação de desempenho entre diferentes runners de teste

## Exemplos de Uso

O diretório `examples/` contém demonstrações práticas:
- Configuração de servidor HTTP
- Configuração de banco de dados
- Sistema de configuração global com merge de múltiplas fontes
- Exemplos de arquivos de configuração em YAML e JSON

## Scripts Disponíveis

No `package.json`, os seguintes scripts estão definidos:
- `npm test`: Executa testes usando o runner nativo do Node.js
- `npm run test:purecore`: Testes com runner nativo
- `npm run test:jest`: Testes com Jest
- `npm run test:vitest`: Testes com Vitest
- `npm run test:compare`: Compara desempenho entre runners
- `npm run examples`: Executa todos os exemplos
- `npm run example:server`: Exemplo de configuração de servidor
- `npm run example:db`: Exemplo de configuração de banco de dados
- `npm run example:global`: Exemplo de configuração global

## Casos de Uso

- **Microserviços**: Onde o tamanho do bundle é crítico
- **Funções Serverless**: Para reduzir tempo de cold start
- **Ferramentas CLI**: Onde dependências extras são indesejáveis
- **Projetos pequenos/médios**: Onde não se deseja instalar múltiplas bibliotecas

## Limitações Conscientes

O parser YAML não suporta:
- Tags customizadas (`!!binary`, `!!timestamp`)
- Referências (`&anchor`, `*alias`)
- Funções (`!!js/function`)
- Documentos múltiplos (`---`)

Mas cobre 100% dos casos de configuração comuns!

## Desenvolvimento e Contribuição

- O código segue a filosofia "batteries included"
- Contribuições são bem-vindas seguindo o fluxo padrão de fork, branch, commit e pull request
- O projeto é licenciado sob a licença MIT