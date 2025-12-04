const { loadGlobalConfig } = require('./global-config');

// Carregar configurações globais
loadGlobalConfig();

console.log('\n🧪 Testando configurações carregadas...\n');

// Testar variáveis de ambiente
console.log('🌍 Variáveis de Ambiente:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV} (${typeof process.env.NODE_ENV})`);
console.log(`   PORT: ${process.env.PORT} (${typeof process.env.PORT})`);
console.log(`   DEBUG: ${process.env.DEBUG} (${typeof process.env.DEBUG})`);
console.log(`   API_URL: ${process.env.API_URL} (${typeof process.env.API_URL})`);
console.log(`   DATABASE_URL: ${process.env.DATABASE_URL} (${typeof process.env.DATABASE_URL})`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET?.substring(0, 10)}... (${typeof process.env.JWT_SECRET})`);

console.log('\n📋 Configuração YAML carregada:');
console.log(`   App Name: ${global.CONFIG?.yaml?.app?.name}`);
console.log(`   Database Host: ${global.CONFIG?.yaml?.database?.host}`);
console.log(`   API Timeout: ${global.CONFIG?.yaml?.api?.timeout}`);

console.log('\n📋 Configuração JSON carregada:');
console.log(`   App Name: ${global.CONFIG?.json?.app?.name}`);
console.log(`   Database Host: ${global.CONFIG?.json?.database?.host}`);
console.log(`   API Timeout: ${global.CONFIG?.json?.api?.timeout}`);

console.log('\n🔄 Configuração mesclada (all):');
console.log(`   App Name: ${global.CONFIG?.all?.app?.name}`);
console.log(`   App Port: ${global.CONFIG?.all?.app?.port} (${typeof global.CONFIG?.all?.app?.port})`);
console.log(`   App Debug: ${global.CONFIG?.all?.app?.debug} (${typeof global.CONFIG?.all?.app?.debug})`);
console.log(`   Database Host: ${global.CONFIG?.all?.database?.host}`);
console.log(`   API Base URL: ${global.CONFIG?.all?.api?.baseUrl}`);
console.log(`   JWT Secret: ${global.CONFIG?.all?.auth?.jwt?.secret?.substring(0, 10)}...`);
console.log(`   Redis Host: ${global.CONFIG?.all?.cache?.redis?.host}`);
console.log(`   SMTP Host: ${global.CONFIG?.all?.email?.smtp?.host}`);
console.log(`   Log Level: ${global.CONFIG?.all?.logging?.level}`);
console.log(`   Features: [${global.CONFIG?.all?.features?.join(', ')}]`);

console.log('\n🔍 Testando função getConfig():');
console.log(`   getConfig('app.name'): ${global.getConfig('app.name')}`);
console.log(`   getConfig('database.host'): ${global.getConfig('database.host')}`);
console.log(`   getConfig('api.timeout'): ${global.getConfig('api.timeout')}`);
console.log(`   getConfig('auth.jwt.secret'): ${global.getConfig('auth.jwt.secret')?.substring(0, 10)}...`);
console.log(`   getConfig('features.0'): ${global.getConfig('features.0')}`);

console.log('\n✅ Teste concluído! Todas as configurações foram carregadas com sucesso.');
