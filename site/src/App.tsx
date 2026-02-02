import { motion } from 'framer-motion';
import { 
  Github, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Download,
  ExternalLink,
  ChevronRight,
  Settings,
  Play,
  Copy
} from 'lucide-react';
import InteractiveDemo from './components/InteractiveDemo';
import './style.css';

const App = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen selection:bg-primary/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[0%] right-[-5%] w-[35%] h-[35%] bg-secondary/10 blur-[100px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Settings className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Configify</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#playground" className="hover:text-white transition-colors">Playground</a>
            <a href="#installation" className="hover:text-white transition-colors">Setup</a>
            <a 
              href="https://github.com/suissa/purecore-one-configurator-4-all" 
              className="flex items-center space-x-2 text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-8"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Version 0.1.0 is Live</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
            >
              Configure <span className="text-gradient">Everything</span>.<br />
              Install <span className="underline decoration-primary/30">Nothing</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              A zero-dependency, ultra-lightweight configuration manager for Node.js. 
              Native support for .env and YAML with intelligent types.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <a href="#installation" className="btn-primary flex items-center space-x-2">
                <span>Start Building</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#playground" className="btn-secondary flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Try Live Demo</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4">Engineered for Performance</h2>
              <p className="text-gray-400">Everything you need, nothing you don't.</p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <FeatureCard 
                icon={<ShieldCheck className="w-6 h-6 text-green-400" />}
                title="Zero Dependencies"
                description="We don't pull in half of NPM. Just pure, optimized JavaScript logic."
                variant={itemVariants}
              />
              <FeatureCard 
                icon={<Cpu className="w-6 h-6 text-primary" />}
                title="Auto-Typing"
                description="Strings are automatically cast to Booleans, Numbers, or Null. No more casting hell."
                variant={itemVariants}
              />
              <FeatureCard 
                icon={<Layers className="w-6 h-6 text-secondary" />}
                title="Nested Objects"
                description="Parse deep YAML structures and .env variables with elegant precision."
                variant={itemVariants}
              />
            </motion.div>
          </div>
        </section>

        {/* Playground Section */}
        <section id="playground" className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Interactive Playground</h2>
            <p className="text-gray-400">See the magic happen in real-time.</p>
          </div>
          <InteractiveDemo />
        </section>

        {/* Installation */}
        <section id="installation" className="py-32 px-6 bg-white/[0.02]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Download className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">Get Started in Seconds</h2>
            </div>
            <div className="glass rounded-2xl p-2 border-white/10 shadow-3xl">
              <div className="bg-black/40 rounded-xl p-6 relative overflow-hidden group">
                <pre className="text-sm font-mono text-gray-300">
                  <span className="text-gray-500"># Install via Bun</span>
                  <br />
                  <span className="text-primary">$</span> bun add @purecore/one-configurator-4-all
                </pre>
                <button 
                  onClick={() => navigator.clipboard.writeText('bun add @purecore/one-configurator-4-all')}
                  className="absolute right-4 top-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-60">
          <div className="flex items-center space-x-2 mb-8 md:mb-0">
            <Settings className="w-5 h-5 text-primary" />
            <span className="font-bold">Configify</span>
          </div>
          <p className="text-sm text-center md:text-left">
            Built with ❤️ for the community by suissa. Licensed under MIT.
          </p>
          <div className="flex space-x-6 mt-8 md:mt-0">
            <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="hover:text-white transition-colors"><ExternalLink className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, variant }: any) => (
  <motion.div 
    variants={variant}
    className="glass p-8 rounded-3xl hover:bg-white/5 transition-all group"
  >
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default App;