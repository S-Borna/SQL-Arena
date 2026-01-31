import { useAuth } from '../auth';

interface LandingPageProps {
    onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#050508] flex flex-col overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-float" />
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
                <div className="absolute inset-0 bg-grid opacity-30" />
            </div>

            {/* Hero Section */}
            <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-16 z-10">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Animated Logo */}
                    <div className="mb-8 flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-2xl opacity-30 animate-glow-pulse" />
                            <div className="relative glass-card p-5 rounded-2xl">
                                <svg viewBox="0 0 64 64" className="w-20 h-20 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" fill="currentColor">
                                    <path d="M32 4C18.7 4 8 9.4 8 16v32c0 6.6 10.7 12 24 12s24-5.4 24-12V16c0-6.6-10.7-12-24-12zm0 4c11.6 0 20 4.5 20 8s-8.4 8-20 8-20-4.5-20-8 8.4-8 20-8zm20 40c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V48zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V36zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V24z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Title with Gradient */}
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight animate-slide-up-fade">
                        SQL{' '}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">Arena</span>
                            <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-2xl opacity-30" />
                        </span>
                    </h1>

                    {/* Tagline */}
                    <p className="text-2xl md:text-4xl text-white/80 font-light mb-4 tracking-wide animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
                        Skriv. Kör. Lär dig.
                    </p>

                    <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
                        Praktisk SQL-träning med riktiga databaser och direkt feedback i webbläsaren.
                    </p>

                    {/* Free Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 glass-card rounded-full border border-green-500/30 animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-green-400 font-semibold text-sm">100% Gratis</span>
                        <span className="text-zinc-500 text-sm">• Inget konto krävs</span>
                    </div>

                    {/* CTA Button */}
                    <div className="animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
                        <button
                            onClick={onStart}
                            className="group relative px-10 py-5 text-white text-xl font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 animate-gradient" />
                            <div className="absolute inset-0 animate-shimmer" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 blur-xl" />
                            <span className="relative flex items-center gap-3">
                                {user ? 'Fortsätt träna' : 'Börja träna nu'}
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up-fade" style={{ animationDelay: '0.5s' }}>
                        <div className="stat-card glass-card rounded-2xl">
                            <div className="stat-number">6</div>
                            <div className="text-zinc-500 text-sm font-medium mt-1">Moduler</div>
                        </div>
                        <div className="stat-card glass-card rounded-2xl">
                            <div className="stat-number">70+</div>
                            <div className="text-zinc-500 text-sm font-medium mt-1">Övningar</div>
                        </div>
                        <div className="stat-card glass-card rounded-2xl">
                            <div className="stat-number">3</div>
                            <div className="text-zinc-500 text-sm font-medium mt-1">Databaser</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative z-10 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Allt du behöver för att{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">bemästra SQL</span>
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Från grunden till avancerad nivå – strukturerat och praktiskt.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="group glass-card glass-card-hover p-6 cursor-pointer">
                            <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 group-hover:scale-110 transition-transform duration-300">⚡</div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">Arena - Träna SQL</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">70+ övningar i 6 nivåer. SELECT, WHERE, ORDER BY, GROUP BY, JOINs och subqueries.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group glass-card glass-card-hover p-6 cursor-pointer">
                            <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 group-hover:scale-110 transition-transform duration-300">🗺️</div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">Roadmap</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">6 moduler med 14 delar som följer kursmålen. Strukturerad väg till VG.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group glass-card glass-card-hover p-6 cursor-pointer">
                            <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 group-hover:scale-110 transition-transform duration-300">🧪</div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">Labs - Sandlåda</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Kör fria queries eller bygg egen databas. Exportera som .sql-fil.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group glass-card glass-card-hover p-6 cursor-pointer">
                            <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 group-hover:scale-110 transition-transform duration-300">📐</div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">Design Studio</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Normaliseringsövningar: 1NF, 2NF, 3NF och Many-to-Many relationer.</p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group glass-card glass-card-hover p-6 cursor-pointer">
                            <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 group-hover:scale-110 transition-transform duration-300">🕎</div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">Hanukkah Mystery</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">8 mysterie-gåtor att lösa med SQL. Progressiv upplåsning.</p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group glass-card glass-card-hover p-6 cursor-pointer">
                            <div className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 group-hover:scale-110 transition-transform duration-300">📋</div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">Cheat Sheet</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">SQL-referens med 65+ koncept. Flashcards och quiz för att testa dig.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Section */}
            <div className="relative z-10 py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Spara din progress</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-card p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-xl">🚀</div>
                                <h3 className="text-white font-semibold">Utan konto</h3>
                            </div>
                            <ul className="text-zinc-400 text-sm space-y-2">
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Full tillgång till alla funktioner
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Query sparas under sessionen
                                </li>
                                <li className="flex items-center gap-2 text-zinc-500">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    Stänger du fliken börjar du om
                                </li>
                            </ul>
                        </div>
                        
                        <div className="relative glass-card p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl" />
                            <div className="absolute inset-[1px] bg-[#0a0a0c] rounded-2xl" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-xl">⭐</div>
                                    <div>
                                        <h3 className="text-white font-semibold">Med konto</h3>
                                        <span className="text-xs text-green-400 font-medium">Gratis!</span>
                                    </div>
                                </div>
                                <ul className="text-zinc-400 text-sm space-y-2">
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Progress sparas permanent
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Fortsätt där du slutade
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Se avklarade övningar
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="relative z-10 py-12 px-4 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-zinc-600 text-xs uppercase tracking-[0.2em] mb-8 font-medium">Powered by</p>
                    <div className="flex flex-wrap justify-center items-center gap-10">
                        <span className="text-zinc-600 text-sm font-medium transition-colors cursor-default hover:text-cyan-400">React</span>
                        <span className="text-zinc-600 text-sm font-medium transition-colors cursor-default hover:text-blue-400">TypeScript</span>
                        <span className="text-zinc-600 text-sm font-medium transition-colors cursor-default hover:text-purple-400">Vite</span>
                        <span className="text-zinc-600 text-sm font-medium transition-colors cursor-default hover:text-teal-400">Tailwind</span>
                        <span className="text-zinc-600 text-sm font-medium transition-colors cursor-default hover:text-orange-400">Cloudflare</span>
                        <span className="text-zinc-600 text-sm font-medium transition-colors cursor-default hover:text-sky-400">sql.js</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <svg viewBox="0 0 64 64" className="w-7 h-7 text-cyan-400" fill="currentColor">
                                <path d="M32 4C18.7 4 8 9.4 8 16v32c0 6.6 10.7 12 24 12s24-5.4 24-12V16c0-6.6-10.7-12-24-12zm0 4c11.6 0 20 4.5 20 8s-8.4 8-20 8-20-4.5-20-8 8.4-8 20-8zm20 40c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V48zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V36zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V24z" />
                            </svg>
                            <span className="text-white font-semibold">SQL Arena</span>
                            <span className="text-zinc-700 text-sm">© 2026</span>
                        </div>

                        <p className="text-zinc-500 text-sm">
                            Byggt med <span className="text-red-400">❤️</span> av{' '}
                            <a href="https://saidborna.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Said Borna</a>
                        </p>

                        <a href="https://github.com/S-Borna/SQL-Arena" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            <span className="text-sm font-medium">GitHub</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
