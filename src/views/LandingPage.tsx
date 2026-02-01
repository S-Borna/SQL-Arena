import { useAuth } from '../auth';

interface LandingPageProps {
    onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#0d1117] flex flex-col overflow-hidden">
            {/* GitHub-style Background - Deep blue/purple gradient */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Main hero glow - blue dominant */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1400px] h-[900px] bg-gradient-to-b from-blue-600/40 via-indigo-600/30 to-transparent rounded-full blur-[150px]" />
                {/* Purple accent left */}
                <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/25 via-violet-600/20 to-transparent rounded-full blur-[120px]" />
                {/* Blue accent right */}
                <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-[100px]" />
                {/* Bottom purple glow */}
                <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-gradient-to-t from-purple-700/20 via-indigo-600/15 to-transparent rounded-full blur-[100px]" />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,139,253,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,139,253,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            {/* Hero Section */}
            <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 z-10">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-10 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-blue-200 text-sm font-medium">100% Gratis</span>
                        <span className="text-blue-500/50">•</span>
                        <span className="text-blue-300/70 text-sm">Ingen registrering krävs</span>
                    </div>

                    {/* Main Title - GitHub style */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                        <span className="text-white">Lär dig SQL</span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            på riktigt
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Praktisk träning med riktiga databaser och direkt feedback.
                        <br className="hidden md:block" />
                        <span className="text-slate-500">Från nybörjare till avancerad nivå.</span>
                    </p>

                    {/* CTA Buttons - GitHub style */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onStart}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 text-white text-lg font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-100 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative">{user ? 'Fortsätt träna' : 'Kom igång nu'}</span>
                            <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                        <a
                            href="#features"
                            className="inline-flex items-center gap-2 px-6 py-4 text-slate-300 text-lg font-medium rounded-xl border border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                        >
                            Se funktioner
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-20">
                        <div className="text-center">
                            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">70+</div>
                            <div className="text-blue-400/80 text-sm mt-2 font-medium tracking-wide uppercase">Övningar</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">6</div>
                            <div className="text-blue-400/80 text-sm mt-2 font-medium tracking-wide uppercase">Nivåer</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">4</div>
                            <div className="text-blue-400/80 text-sm mt-2 font-medium tracking-wide uppercase">Databaser</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="relative z-10 py-28 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Allt du behöver
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto">
                            Komplett plattform för att gå från nybörjare till SQL-proffs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 - Arena */}
                        <div className="group p-7 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Arena</h3>
                            <p className="text-slate-400 leading-relaxed">70+ övningar i 6 nivåer. SELECT, WHERE, JOINs, GROUP BY, subqueries och fönsterfunktioner.</p>
                        </div>

                        {/* Feature 2 - Roadmap */}
                        <div className="group p-7 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Roadmap</h3>
                            <p className="text-slate-400 leading-relaxed">Strukturerad inlärningsväg med 6 moduler som följer kursmålen steg för steg.</p>
                        </div>

                        {/* Feature 3 - Labs */}
                        <div className="group p-7 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Labs</h3>
                            <p className="text-slate-400 leading-relaxed">Fri sandlåda för egna queries. Skapa, bygg och exportera egna databaser.</p>
                        </div>

                        {/* Feature 4 - Design Studio */}
                        <div className="group p-7 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Design Studio</h3>
                            <p className="text-slate-400 leading-relaxed">Normalisering: 1NF, 2NF, 3NF. Öva på databasdesign interaktivt.</p>
                        </div>

                        {/* Feature 5 - Hanukkah of Data */}
                        <div className="group p-7 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-500">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-5 shadow-lg shadow-amber-500/25 group-hover:scale-110 transition-transform duration-300">
                                {/* Menorah icon */}
                                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2c.55 0 1 .45 1 1v2h-2V3c0-.55.45-1 1-1zM4 4c.55 0 1 .45 1 1v2H3V5c0-.55.45-1 1-1zm16 0c.55 0 1 .45 1 1v2h-2V5c0-.55.45-1 1-1zM7 4c.55 0 1 .45 1 1v2H6V5c0-.55.45-1 1-1zm10 0c.55 0 1 .45 1 1v2h-2V5c0-.55.45-1 1-1zM9.5 4c.55 0 1 .45 1 1v2h-2V5c0-.55.45-1 1-1zm5 0c.55 0 1 .45 1 1v2h-2V5c0-.55.45-1 1-1zM3 8h18v2H3V8zm1 4h16v1c0 2.21-1.79 4-4 4h-2v3h-4v-3H8c-2.21 0-4-1.79-4-4v-1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Hanukkah of Data</h3>
                            <p className="text-slate-400 leading-relaxed">8 mysterie-gåtor att lösa med SQL. Progressiv upplåsning som en riktig detektiv.</p>
                        </div>

                        {/* Feature 6 - Cheat Sheet */}
                        <div className="group p-7 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Cheat Sheet</h3>
                            <p className="text-slate-400 leading-relaxed">Komplett SQL-referens med 65+ koncept. Flashcards och quiz för repetition.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Benefits */}
            <div className="relative z-10 py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Spara din progress</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Without Account */}
                        <div className="p-7 rounded-2xl bg-slate-800/30 border border-slate-700/50">
                            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                Utan konto
                            </h3>
                            <ul className="text-slate-400 space-y-4">
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Full tillgång till alla funktioner
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Progress sparas under sessionen
                                </li>
                                <li className="flex items-center gap-3 text-slate-500">
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                    Försvinner när du stänger fliken
                                </li>
                            </ul>
                        </div>

                        {/* With Account */}
                        <div className="relative p-7 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/15 to-cyan-600/10" />
                            <div className="absolute inset-0 border border-blue-500/30 rounded-2xl" />
                            <div className="relative">
                                <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                    </div>
                                    Med konto
                                    <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold border border-green-500/30">Gratis</span>
                                </h3>
                                <ul className="text-slate-300 space-y-4">
                                    <li className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Progress sparas permanent
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Fortsätt där du slutade
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        Statistik över avklarade övningar
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800 py-16 px-4 bg-[#0d1117]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center gap-10">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-white">SQL Arena</span>
                        </div>

                        {/* Credit */}
                        <div className="text-center">
                            <p className="text-slate-400 mb-3">
                                Designed & Built by{' '}
                                <a href="https://saidborna.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                                    Said Borna
                                </a>
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {['React', 'TypeScript', 'Tailwind CSS', 'SQL.js', 'Cloudflare Pages', 'D1 Database'].map((tech) => (
                                <span key={tech} className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Portfolio Link */}
                        <a
                            href="https://saidborna.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            saidborna.com
                        </a>

                        {/* Copyright */}
                        <p className="text-slate-600 text-sm">
                            © 2026 SQL Arena. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
