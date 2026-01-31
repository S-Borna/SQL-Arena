import { useAuth } from '../auth';

interface LandingPageProps {
    onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col">
            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Logo with SQL icon */}
                    <div className="mb-6 flex items-center justify-center gap-4">
                        <svg viewBox="0 0 64 64" className="w-16 h-16 text-cyan-400" fill="currentColor">
                            <path d="M32 4C18.7 4 8 9.4 8 16v32c0 6.6 10.7 12 24 12s24-5.4 24-12V16c0-6.6-10.7-12-24-12zm0 4c11.6 0 20 4.5 20 8s-8.4 8-20 8-20-4.5-20-8 8.4-8 20-8zm20 40c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V48zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V36zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V24z" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        SQL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Arena</span>
                    </h1>

                    {/* Tagline - impactful, not cheesy */}
                    <p className="text-2xl md:text-3xl text-zinc-300 font-light mb-4">
                        Skriv. Kör. Lär dig.
                    </p>

                    <p className="text-lg text-zinc-500 mb-8 max-w-xl mx-auto">
                        Praktisk SQL-träning med riktiga databaser och direkt feedback i webbläsaren.
                    </p>

                    {/* Free notice */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-6 py-4 mb-8 max-w-xl mx-auto">
                        <p className="text-green-400 font-medium mb-2">🆓 Helt gratis att använda!</p>
                        <p className="text-zinc-400 text-sm">
                            Inget konto krävs för att börja. Skapa ett gratis konto för att spara din progress.
                        </p>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={onStart}
                        className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
                    >
                        {user ? 'Fortsätt träna' : 'Börja träna nu'}
                        <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
                    </button>

                    {/* Stats - without 72h */}
                    <div className="mt-12 flex justify-center gap-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400">6</div>
                            <div className="text-zinc-500 text-sm">Moduler</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400">50+</div>
                            <div className="text-zinc-500 text-sm">Övningar</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400">3</div>
                            <div className="text-zinc-500 text-sm">Databaser</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section - moved up */}
            <div className="bg-zinc-900/50 border-t border-zinc-800 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-white mb-4">Vad du hittar här</h2>
                    <p className="text-center text-zinc-400 mb-10 max-w-2xl mx-auto">
                        Allt du behöver för att lära dig SQL – från grunden till avancerad nivå.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Feature 1 */}
                        <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700 hover:border-cyan-500/30 transition-colors">
                            <div className="text-2xl mb-3">⚡</div>
                            <h3 className="text-base font-semibold text-white mb-2">Arena - Träna SQL</h3>
                            <p className="text-zinc-400 text-sm">
                                70+ övningar i 6 nivåer. SELECT, WHERE, ORDER BY, GROUP BY, JOINs och subqueries.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700 hover:border-cyan-500/30 transition-colors">
                            <div className="text-2xl mb-3">🗺️</div>
                            <h3 className="text-base font-semibold text-white mb-2">Roadmap</h3>
                            <p className="text-zinc-400 text-sm">
                                6 moduler med 14 delar som följer kursmålen. Strukturerad väg till VG.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700 hover:border-cyan-500/30 transition-colors">
                            <div className="text-2xl mb-3">🧪</div>
                            <h3 className="text-base font-semibold text-white mb-2">Labs - Sandlåda</h3>
                            <p className="text-zinc-400 text-sm">
                                Kör fria queries eller bygg egen databas. Exportera som .sql-fil.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700 hover:border-cyan-500/30 transition-colors">
                            <div className="text-2xl mb-3">📐</div>
                            <h3 className="text-base font-semibold text-white mb-2">Design Studio</h3>
                            <p className="text-zinc-400 text-sm">
                                Normaliseringsövningar: 1NF, 2NF, 3NF och Many-to-Many relationer.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700 hover:border-cyan-500/30 transition-colors">
                            <div className="text-2xl mb-3">🕎</div>
                            <h3 className="text-base font-semibold text-white mb-2">Hanukkah Mystery</h3>
                            <p className="text-zinc-400 text-sm">
                                8 mysterie-gåtor att lösa med SQL. Progressiv upplåsning.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700 hover:border-cyan-500/30 transition-colors">
                            <div className="text-2xl mb-3">📋</div>
                            <h3 className="text-base font-semibold text-white mb-2">Cheat Sheet</h3>
                            <p className="text-zinc-400 text-sm">
                                SQL-referens med 65+ koncept. Flashcards och quiz för att testa dig.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account info - compact */}
            <div className="bg-zinc-950 py-10 px-4 border-t border-zinc-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold text-white mb-6 text-center">Spara din progress</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800">
                            <h3 className="text-cyan-400 font-semibold mb-2">🚀 Utan konto</h3>
                            <ul className="text-zinc-400 text-sm space-y-1">
                                <li>• Full tillgång till alla funktioner</li>
                                <li>• Query sparas under sessionen</li>
                                <li>• Stänger du fliken börjar du om</li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-5 border border-cyan-500/30">
                            <h3 className="text-cyan-400 font-semibold mb-2">⭐ Med konto (gratis)</h3>
                            <ul className="text-zinc-400 text-sm space-y-1">
                                <li>• Progress sparas permanent</li>
                                <li>• Fortsätt där du slutade</li>
                                <li>• Se avklarade övningar</li>
                            </ul>
                        </div>
                    </div>

                    {/* Warning about custom databases */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 max-w-2xl mx-auto">
                        <p className="text-amber-400 text-sm font-medium mb-2">⚠️ Sparas inte (även med konto):</p>
                        <ul className="text-zinc-400 text-sm space-y-1">
                            <li>• <span className="text-amber-400/80">🧪 Egna databaser</span> – exportera som .sql för att spara</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Powered By Section */}
            <div className="bg-zinc-900/30 py-10 px-4 border-t border-zinc-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-zinc-600 text-xs uppercase tracking-widest mb-6">Powered by</p>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {/* React */}
                        <div className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                            </svg>
                            <span className="text-sm font-medium">React</span>
                        </div>

                        {/* TypeScript */}
                        <div className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                            </svg>
                            <span className="text-sm font-medium">TypeScript</span>
                        </div>

                        {/* Vite */}
                        <div className="flex items-center gap-2 text-zinc-500 hover:text-purple-400 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z" />
                            </svg>
                            <span className="text-sm font-medium">Vite</span>
                        </div>

                        {/* Tailwind */}
                        <div className="flex items-center gap-2 text-zinc-500 hover:text-teal-400 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                            </svg>
                            <span className="text-sm font-medium">Tailwind</span>
                        </div>

                        {/* Cloudflare */}
                        <div className="flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M16.5088 16.8447c.1475-.5068.0908-.9707-.1553-1.2678-.2246-.2699-.5765-.4102-.9634-.4102H6.5014c-.0656 0-.1475-.0164-.1639-.0437-.0163-.0273-.0327-.0818-.0163-.1473l.18-.583c.0491-.1583.2245-.2945.4245-.31h9.0117c1.1802 0 2.4066-1.0008 2.7583-2.2528.1638-.5877.1966-1.1291.1147-1.6023-.2573-1.4665-1.5167-2.5182-3.047-2.5182h-.377c-.3119-.9598-1.0446-1.7538-1.9708-2.1313-1.227-.5014-2.6504-.2876-3.656.5469-1.0055.8345-1.3738 2.2035-1.0555 3.4146l-.3443.0191c-1.6523 0-3.2554.9106-3.8863 2.2473-.3119.6605-.4428 1.3648-.3937 2.0746.0492.7098.3065 1.4086.7511 1.9951.554.7316 1.3903 1.1618 2.2746 1.1618h9.3036c.1967 0 .4096-.1364.4916-.3119l.3771-1.2459zm3.3394-4.7224c-.0492 0-.0656.0437-.0819.0764-.0655.2945-.1639.5796-.2949.8538l-.246.474c-.0327.0655-.0163.1528.0491.2019l.5258.4375c.4589.3993.7348.9871.7348 1.6204 0 1.1782-.9553 2.1367-2.1314 2.1367h-2.4572c-.0656 0-.0983.0546-.1147.0873l-.3609 1.2023c-.0327.0983-.0163.191.0655.2692.0818.0782.18.1364.2949.1364h2.5885c2.012 0 3.7863-1.3484 4.3781-3.3196.323-1.0664.1967-2.2091-.3444-3.1988-.5412-.9898-1.4419-1.7266-2.5394-2.0746l-.0655-.0164c-.0163 0-.0327 0-.0491.0163z" />
                            </svg>
                            <span className="text-sm font-medium">Cloudflare</span>
                        </div>

                        {/* SQLite/sql.js */}
                        <div className="flex items-center gap-2 text-zinc-500 hover:text-sky-400 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M21.678.521c-1.032-.92-2.28-.55-3.678.544A8.15 8.15 0 0 0 16.678 2c-.093.093-.17.178-.252.264-.02.022-.043.04-.063.063l-.005.003c-1.46 1.597-2.853 3.927-3.894 6.755-.143.382-.267.764-.39 1.147-.03.1-.061.2-.091.298v.005a.076.076 0 0 1-.004.01c-.093.306-.176.612-.258.914-.047.181-.094.362-.14.538v.003a34.9 34.9 0 0 0-.454 2.074c-.025.126-.05.25-.073.37v.005c-.082.447-.152.896-.21 1.338v.006c-.057.44-.102.877-.135 1.31v.005l-.028.379c-.01.175-.025.34-.03.515l-.003.064v.044l.019.394c.02.214.04.428.07.637l.003.019c.027.192.065.38.105.567l.006.021c.042.188.093.374.15.558.058.182.12.36.2.535l.016.046.01.016a4.272 4.272 0 0 0 .9 1.32c.032.03.057.058.09.088l.012.01.006.004c.095.087.19.169.293.247l.016.01c.096.076.2.144.305.21l.015.01a4.167 4.167 0 0 0 .706.363l.008.003a4.376 4.376 0 0 0 .716.225h.003l.11.023.043.008a5.12 5.12 0 0 0 .24.035l.03.003a4.71 4.71 0 0 0 .329.028h.01c.128.006.257.01.39.01 1.263 0 2.796-.497 4.403-1.328a19.093 19.093 0 0 0 3.088-2.008c.193-.156.382-.317.57-.48a22.2 22.2 0 0 0 .825-.754c.156-.15.306-.3.456-.453l.003-.002c1.764-1.822 3.26-4.04 4.14-6.377.964-2.577 1.106-4.902.178-6.238-.07-.102-.148-.2-.233-.295zm-1.782 8.248c-.27.782-.623 1.574-1.044 2.358-.89-2.594-2.191-4.932-3.664-6.632.37-.218.728-.401 1.075-.544 1.21-.498 2.129-.451 2.59.124.453.572.42 1.62-.094 3.088-.218.625-.512 1.089-.863 1.606z" />
                            </svg>
                            <span className="text-sm font-medium">sql.js</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - redesigned */}
            <footer className="bg-zinc-950 border-t border-zinc-800">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-3">
                            <svg viewBox="0 0 64 64" className="w-8 h-8 text-cyan-400" fill="currentColor">
                                <path d="M32 4C18.7 4 8 9.4 8 16v32c0 6.6 10.7 12 24 12s24-5.4 24-12V16c0-6.6-10.7-12-24-12zm0 4c11.6 0 20 4.5 20 8s-8.4 8-20 8-20-4.5-20-8 8.4-8 20-8zm20 40c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V48zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V36zm0-12c0 3.5-8.4 8-20 8s-20-4.5-20-8v-6.2c4.3 3.4 11.6 5.2 20 5.2s15.7-1.8 20-5.2V24z" />
                            </svg>
                            <div>
                                <span className="text-white font-bold">SQL Arena</span>
                                <span className="text-zinc-600 text-sm ml-2">© 2026</span>
                            </div>
                        </div>

                        {/* Designed by */}
                        <div className="text-center">
                            <p className="text-zinc-400 text-sm">
                                Designat och byggt med <span className="text-red-400">❤️</span> för DevOps Ingenjörer av{' '}
                                <a
                                    href="https://saidborna.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                                >
                                    Said Borna
                                </a>
                            </p>
                        </div>

                        {/* Links - Portfolio */}
                        <a
                            href="https://saidborna.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                            <span className="text-sm font-medium">saidborna.com</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
