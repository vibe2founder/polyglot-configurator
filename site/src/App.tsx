import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
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
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const startY = window.scrollY;
      const targetY = element.getBoundingClientRect().top + window.scrollY - 80;
      const distance = targetY - startY;
      const duration = 1200;
      const startTime = performance.now();

      const easeOutElastic = (t: number): number => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      };

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutElastic(progress);
        
        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
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
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* <img
              src="/logo.png"
              alt="one-configurator-4-all Logo"
              className="h-10 w-auto rounded-lg shadow-lg shadow-primary/20"
            /> */}
            <Settings className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">
              one-configurator-4-all
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <motion.a 
              href="#features" 
              onClick={(e) => handleNavClick(e, '#features')}
              className="hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.a>
            <motion.a
              href="#playground"
              onClick={(e) => handleNavClick(e, '#playground')}
              className="hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Playground
            </motion.a>
            <motion.a
              href="#installation"
              onClick={(e) => handleNavClick(e, '#installation')}
              className="hover:text-white transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Install
            </motion.a>
            <a
              href="https://github.com/purecore-codes/one-configurator-4-all" target="_blank" rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="pt-0 pb-32 px-6 min-h-screen max-h-screen">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.1, opacity: 0, y: -200 }}
              animate={imageLoaded ? { scale: 1, opacity: 1, y: 20 } : { scale: 0.1, opacity: 0, y: -200 }}
              transition={{ duration: 0.7 }}
              className="relative z-50 pt-12 inline-flex items-center space-x-2 mb-8"
            >
              <img
                src="/logo.png"
                alt="one-configurator-4-all Logo"
                className="w-[60%] -top-6 md:top-0 md:w-[350px] mx-auto relative z-50"
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={imageLoaded ? { y: -50, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.7 }}
              className="relative z-0 text-3xl md:text-7xl font-black mb-6 tracking-tighter"
            >
              one-<span className="text-purple-500">configurator</span>-4-all
              
              </motion.h1>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={imageLoaded ? { y: -40, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.9 }}
              className="relative z-0 text-3xl md:text-6xl font-black mb-6 tracking-tighter"
            >
              Configure <span className="text-purple-500">Everything</span>.
              <br />

              <span className="text-[44px] md:text-7xl">Install{" "}
                <span className="underline decoration-primary/30 text-purple-500">Nothing</span>.
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={imageLoaded ? { y: -40, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 1.1 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              A zero-dependency, ultra-lightweight configuration manager for
              Node.js. Native support for .env and YAML with intelligent types.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={imageLoaded ? { y: -40, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <a
                href="#installation"
                className="btn-primary flex items-center space-x-2"
              >
                <span>Start Building</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#playground"
                className="btn-secondary flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Try Live Demo</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="min-h-screen py-32 px-6 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4">
                Engineered for Performance
              </h2>
              <p className="text-gray-400">
                Everything you need, nothing you don't.
              </p>
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
          <div className="max-w-7xl mx-auto text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Interactive Playground</h2>
            <p className="text-gray-400">See the magic happen in real-time.</p>
          </div>
          <InteractiveDemo />
        </section>

        {/* Installation */}
        <section id="installation" className="min-h-screen py-32 pt-20 px-6 bg-white/[0.01]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Download className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Get Started in Seconds
              </h2>
            </div>
            <div className="mt-6 glass rounded-2xl p-2 border-white/10 shadow-3xl">
              <div className="bg-black/40 rounded-xl p-6 relative overflow-hidden group">
                <pre className="text-sm font-mono text-gray-300">
                  <span className="text-gray-500"># Install via p3g</span>
                  <br />
                  <span className="text-primary">$</span> p3g
                  @purecore/one-configurator-4-all
                </pre>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "p3g @purecore/one-configurator-4-all",
                    )
                  }
                  className="absolute right-4 top-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-6 glass rounded-2xl p-2 border-white/10 shadow-3xl">
              <div className="bg-black/40 rounded-xl p-6 relative overflow-hidden group">
                <pre className="text-sm font-mono text-gray-300">
                  <span className="text-gray-500"># Install via bun</span>
                  <br />
                  <span className="text-primary">$</span> bun add
                  @purecore/one-configurator-4-all
                </pre>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "bun add @purecore/one-configurator-4-all",
                    )
                  }
                  className="absolute right-4 top-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            

            <div className="mt-6 glass rounded-2xl p-2 border-white/10 shadow-3xl">
              <div className="bg-black/40 rounded-xl p-6 relative overflow-hidden group">
                <pre className="text-sm font-mono text-gray-300">
                  <span className="text-gray-500"># Install via npm</span>
                  <br />
                  <span className="text-primary">$</span> npm install
                  one-configurator-4-all
                </pre>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "npm install one-configurator-4-all",
                    )
                  }
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
        <div className="max-w-4xl mx-auto">
          
          <p className="text-sm text-center">
            
            {/* <Settings className="w-5 h-5 text-primary inline-block" /> */}
            Built with ❤️ by<br />

            <img src="https://purecore.codes/logo.png" alt="purecore Logo" className="w-full md:max-w-[300px] mx-auto" />

            <a href="https://purecore.codes" target='_blank' className="ml-4 text-yellow-600 hover:text-white transition-colors inline-block"><ExternalLink className="w-5 h-5" /></a>
          <a href="https://github.com/purecore-codes/one-configurator-4-all" target='_blank' className="ml-2 inline-block hover:text-white transition-colors">
              <Github className="w-5 h-5 text-yellow-600 hover:text-white" />
            </a>
          </p>
          <div className="flex space-x-6 mt-8 md:mt-0">
            
            {/* <a href="#" className="hover:text-white transition-colors">
              <ExternalLink className="w-5 h-5" />
            </a> */}
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