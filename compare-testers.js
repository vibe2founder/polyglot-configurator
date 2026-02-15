const { execSync } = require("child_process");
const { performance } = require("perf_hooks");

console.log(
  "🧪 Iniciando Comparação de Testers para one-configurator-4-all...\n",
);

function measure(name, command) {
  process.stdout.write(`⏳ Executando ${name}... `);
  const start = performance.now();
  let success = true;
  let error = "";

  try {
    execSync(command, {
      stdio: "ignore",
      env: { ...process.env, NODE_ENV: "test" },
    });
  } catch (e) {
    success = false;
    error = e.message;
  }

  const end = performance.now();
  const duration = (end - start).toFixed(2);
  console.log(`${success ? "✅" : "❌"} (${duration}ms)`);

  return { name, duration, status: success ? "✅ PASS" : "❌ FAIL" };
}

const results = [];

// 1. Purecore Tester (Native Node.js)
results.push(measure("purecore tester", "node --test test/purecore.test.js"));

// 2. Jest
results.push(measure("Jest", "npx jest test/jest.test.js --no-cache --ci"));

// 3. Vitest
results.push(measure("Vitest", "npx vitest run test/vitest.test.js"));

console.log("\n### 📊 Tabela Comparativa de Performance\n");
console.log("| Tester | Duração (ms) | Status |");
console.log("| :--- | :---: | :---: |");

results.forEach((r) => {
  console.log(`| **${r.name}** | ${r.duration} | ${r.status} |`);
});

console.log(
  '\n> *Nota: O "purecore tester" utiliza o runner nativo do Node.js sem dependências externas.*'
);
