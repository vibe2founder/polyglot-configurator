import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, FileJson, Settings, Play, Check, Copy } from 'lucide-react';
import { parseYaml, parseEnv } from '../lib/parser';

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState<'yaml' | 'env'>('yaml');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const defaultYaml = `app:
  name: Configify Demo
  version: 1.0.0
  features:
    - Zero Dependencies
    - Type Safe
    - Ultra Lightweight
database:
  port: 5432
  active: true
  meta: null`;

  const defaultEnv = `PORT=3000
DEBUG=true
API_KEY="sk-55123985"
# Auto-typing supported
TIMEOUT=5000
MAX_CONN=null
ENABLE_LOGS=false`;

  useEffect(() => {
    setInput(activeTab === 'yaml' ? defaultYaml : defaultEnv);
  }, [activeTab]);

  useEffect(() => {
    try {
      const result = activeTab === 'yaml' ? parseYaml(input) : parseEnv(input);
      setOutput(result);
    } catch (e) {
      setOutput({ error: "Invalid format" });
    }
  }, [input, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="flex justify-center space-x-4 mb-2">
        <button
          onClick={() => setActiveTab('yaml')}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all ${
            activeTab === 'yaml' 
            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
            : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span className="font-semibold">YAML Parser</span>
        </button>
        <button
          onClick={() => setActiveTab('env')}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all ${
            activeTab === 'env' 
            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
            : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Play className="w-4 h-4" />
          <span className="font-semibold">ENV Parser</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Input Area */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full bg-card/60 backdrop-blur-md border border-card-border rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="px-6 py-4 border-b border-card-border flex items-center justify-between bg-white/5">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-300">Input ({activeTab.toUpperCase()})</span>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow w-full h-[400px] p-6 bg-transparent font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/30 text-gray-200"
            spellCheck={false}
          />
        </motion.div>

        {/* Output Area */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full bg-card/60 backdrop-blur-md border border-card-border rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="px-6 py-4 border-b border-card-border flex items-center justify-between bg-white/5">
            <div className="flex items-center space-x-2">
              <FileJson className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-gray-300">Parsed Output (JSON)</span>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />}
            </button>
          </div>
          <div className="flex-grow w-full overflow-auto p-6 bg-black/20">
            <pre className="font-mono text-sm text-secondary leading-relaxed">
              {JSON.stringify(output, null, 2)}
            </pre>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center">
        <AnimatePresence>
          {output && !output.error && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center space-x-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-lg border border-green-400/20"
            >
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Valid {activeTab.toUpperCase()} Structure detected</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveDemo;