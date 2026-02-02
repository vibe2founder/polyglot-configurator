import React, { useState } from 'react';
import './style.css';
import InteractiveDemo from './components/InteractiveDemo';

function App() {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Configify</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600">Features</a></li>
              <li><a href="#installation" className="text-gray-600 hover:text-blue-600">Installation</a></li>
              <li><a href="#usage" className="text-gray-600 hover:text-blue-600">Usage</a></li>
              <li><a href="#demo" className="text-gray-600 hover:text-blue-600">Live Demo</a></li>
              <li><a href="#docs" className="text-gray-600 hover:text-blue-600">Docs</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Configify - Zero Dependency Configuration</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Uma biblioteca ultra-leve e independente para gerenciamento de configurações em Node.js/JavaScript
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#installation"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </a>
            <a
              href="https://github.com/suissa/purecore-one-configurator-4-all"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Powerful Features, Zero Dependencies</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Environment Variables</h3>
              <p className="text-gray-600">
                Load .env files directly into process.env with automatic type conversion.
                Strings become numbers, booleans, and null values automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">YAML Parsing</h3>
              <p className="text-gray-600">
                Built-in YAML parser with no external dependencies. Supports nested objects,
                arrays, and automatic type conversion.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Zero Dependencies</h3>
              <p className="text-gray-600">
                Lightweight solution with zero external dependencies. Adds minimal KB to your bundle size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Installation</h2>
              <p className="text-gray-600 mb-6">
                Installing Configify is simple and adds no external dependencies to your project.
              </p>

              <div className="bg-gray-800 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400">Terminal</span>
                  <button className="text-gray-400 hover:text-white">
                    Copy
                  </button>
                </div>
                <pre className="whitespace-pre-wrap">
                  <code>{`# Using npm
npm install configify

# Using yarn
yarn add configify

# Using bun
bun add configify`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section id="usage" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Usage Examples</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Example 1: Environment Variables */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Environment Variables</h3>
              <p className="text-gray-600 mb-4">
                Load .env files with automatic type conversion
              </p>

              <div className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`# .env file
PORT=3000
DEBUG=true
TIMEOUT=5000
API_KEY="sk-123456789"`}</pre>
              </div>

              <div className="mt-4 bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { loadEnv } from 'configify';

// Load .env file
loadEnv();

console.log(process.env.PORT); // 3000 (number)
console.log(process.env.DEBUG); // true (boolean)`}</pre>
              </div>
            </div>

            {/* Example 2: YAML Parsing */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">YAML Configuration</h3>
              <p className="text-gray-600 mb-4">
                Parse YAML files with nested structures
              </p>

              <div className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`# config.yaml
app:
  name: MyApp
  version: 1.0.0
  port: 3000
  features:
    - auth
    - api
    - dashboard`}</pre>
              </div>

              <div className="mt-4 bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { loadYaml } from 'configify';

const config = loadYaml('./config.yaml');

console.log(config.app.name); // MyApp
console.log(config.app.port); // 3000 (number)
console.log(config.app.features); // ['auth', 'api', 'dashboard']`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Why Choose Configify?</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-left">Configify</th>
                  <th className="py-4 px-6 text-left">dotenv + js-yaml</th>
                  <th className="py-4 px-6 text-left">Other Libraries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-medium">Dependencies</td>
                  <td className="py-4 px-6"><span className="text-green-600 font-semibold">0</span></td>
                  <td className="py-4 px-6"><span className="text-red-600 font-semibold">2+</span></td>
                  <td className="py-4 px-6"><span className="text-red-600 font-semibold">1+</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Bundle Size</td>
                  <td className="py-4 px-6"><span className="text-green-600 font-semibold">~3KB</span></td>
                  <td className="py-4 px-6"><span className="text-red-600 font-semibold">~700KB</span></td>
                  <td className="py-4 px-6"><span className="text-orange-600 font-semibold">~150-300KB</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">YAML Support</td>
                  <td className="py-4 px-6"><span className="text-green-600">✅</span></td>
                  <td className="py-4 px-6"><span className="text-green-600">✅</span></td>
                  <td className="py-4 px-6"><span className="text-gray-400">❌</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Auto-typing</td>
                  <td className="py-4 px-6"><span className="text-green-600">✅</span></td>
                  <td className="py-4 px-6"><span className="text-gray-400">❌</span></td>
                  <td className="py-4 px-6"><span className="text-green-600">✅</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium">Zero Config</td>
                  <td className="py-4 px-6"><span className="text-green-600">✅</span></td>
                  <td className="py-4 px-6"><span className="text-gray-400">❌</span></td>
                  <td className="py-4 px-6"><span className="text-gray-400">❌</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Try Configify Live</h2>
          <InteractiveDemo />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <h3 className="text-xl font-bold">Configify</h3>
              </div>
              <p className="mt-2 text-gray-400">Ultra-lightweight configuration library</p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Documentation</a>
              <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-white">NPM</a>
              <a href="#" className="text-gray-400 hover:text-white">License</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Configify. Licensed under MIT.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;