import { useAuth } from '../auth';

interface LandingPageProps {
    onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col overflow-hidden">
            {/* Background Gradient Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-to-br from-fuchsia-600/20 via-purple-600/15 to-transparent rounded-full blur-[120px]" />
                <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-rose-500/15 via-pink-600/10 to-transparent rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-to-tr from-violet-600/15 to-transparent rounded-full blur-[80px]" />
            </div>

            {/* Hero Section */}
            <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 z-10">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-zinc-300 text-sm font-medium">Gratis att använda</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-400 text-sm">Inget konto krävs</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
                        <span className="text-white">LÄR DIG</span>
                        <br />
                        <span className="bg-gradient-to-r from-fuchsia-400 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                            SQL PÅ RIKTIGT
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Praktisk träning med riktiga databaser och direkt feedback.
                        <br className="hidden md:block" />
                        Strukturerade övningar från grunden till avancerad nivå.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={onStart}
                        className="group relative inline-flex items-center gap-3 px-8 py-4 text-white text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-100"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600" />
                        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">{user ? 'Fortsätt träna' : 'Kom igång'}</span>
                        <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                    {/* Stats */}
                    <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-16">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white">70+</div>
                            <div className="text-zinc-500 text-sm mt-1 font-medium">Övningar</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white">6</div>
                            <div className="text-zinc-500 text-sm mt-1 font-medium">Nivåer</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white">3</div>
                            <div className="text-zinc-500 text-sm mt-1 font-medium">Databaser</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative z-10 py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Allt på ett ställe
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                            Verktyg och övningar för att gå från nybörjare till avancerad.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Feature 1 - Arena */}
                        <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-fuchsia-500/30 hover:bg-white/[0.04] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-600/5 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Arena</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">70+ övningar i 6 nivåer. SELECT, WHERE, JOINs, GROUP BY och subqueries.</p>
                        </div>

                        {/* Feature 2 - Roadmap */}
                        <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-pink-500/30 hover:bg-white/[0.04] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/5 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Roadmap</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Strukturerad inlärningsväg med 6 moduler som följer kursmålen.</p>
                        </div>

                        {/* Feature 3 - Labs */}
                        <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-rose-500/30 hover:bg-white/[0.04] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/5 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Labs</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Fri sandlåda för egna queries. Bygg och exportera egna databaser.</p>
                        </div>

                        {/* Feature 4 - Design Studio */}
                        <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/5 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Design Studio</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Normalisering: 1NF, 2NF, 3NF. Öva på databasdesign interaktivt.</p>
                        </div>

                        {/* Feature 5 - Mystery */}
                        <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/30 hover:bg-white/[0.04] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Mystery Challenge</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">8 mysterie-gåtor att lösa med SQL. Progressiv upplåsning.</p>
                        </div>

                        {/* Feature 6 - Cheat Sheet */}
                        <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Cheat Sheet</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">Komplett SQL-referens med 65+ koncept. Flashcards och quiz.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Benefits */}
            <div className="relative z-10 py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-10 text-center">Spara din progress</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Without Account */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                Utan konto
                            </h3>
                            <ul className="text-zinc-400 text-sm space-y-3">
                                <li className="flex items-center gap-3">
                                    <svg className="w-4 h-4 text-zinc-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Full tillgång till alla funktioner
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-4 h-4 text-zinc-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Progress sparas under sessionen
                                </li>
                                <li className="flex items-center gap-3 text-zinc-500">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    Försvinner när du stänger fliken
                                </li>
                            </ul>
                        </div>

                        {/* With Account */}
                        <div className="relative p-6 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-rose-500/10" />
                            <div className="absolute inset-0 border border-fuchsia-500/20 rounded-2xl" />
                            <div className="relative">
                                <h3 className="text-white font-semibold mb-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                    </div>
                                    Med konto
                                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">Gratis</span>
                                </h3>
                                <ul className="text-zinc-400 text-sm space-y-3">
                                    <li className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-fuchsia-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Progress sparas permanent
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-fuchsia-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Fortsätt där du slutade
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg className="w-4 h-4 text-fuchsia-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Statistik över avklarade övningar
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/[0.05] py-12 px-4 bg-[#0a0a0f]/80">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center gap-8">
                        {/* Logo and tagline */}
                        <div className="flex items-center gap-3">
                            <svg viewBox="0 0 64 64" className="w-8 h-8 text-fuchsia-400" fill="currentColor">
                                <path d="M32 4C18.7 4 8 9.4 8 16v32c0 6.6 10.7 12 24 12s24-5.4 24-12V16c0-6.6-10.7-12-24-12zm0 4c11.6 0 20 4.5 20 8s-8.4 8-20 8-20-4.5-20-8 8.4-8 20-8zm20 40c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V48zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V36zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V24z" />
                            </svg>
                            <span className="text-xl font-bold text-white">SQL Arena</span>
                        </div>

                        {/* Credit */}
                        <div className="text-center">
                            <p className="text-zinc-400 text-sm mb-2">
                                Designed & Built by{' '}
                                <a href="https://saidborna.com" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors font-semibold">
                                    Said Borna
                                </a>
                            </p>
                            <p className="text-zinc-600 text-xs">
                                Powered by React, TypeScript, SQL.js & Tailwind CSS
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-6">
                            <a href="https://saidborna.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-fuchsia-400 transition-colors" title="Portfolio">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </a>
                            <a href="https://github.com/S-Borna/SQL-Arena" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors" title="GitHub">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                        </div>

                        {/* Copyright */}
                        <p className="text-zinc-600 text-xs">
                            © 2026 SQL Arena. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
