import { useState, useEffect, useCallback } from 'react';
import { SqlEditor } from '../components/SqlEditor';
import { ResultsTable } from '../components/ResultsTable';
import { executeQuery, getTableList, getTableSchema } from '../engine/sqlRunner';
import type { QueryResult } from '../types';

// The actual Hanukkah of Data puzzles from hanukkah.bluebird.sh
const puzzles = [
    {
        id: 0,
        title: "Noah's Market",
        story: `Welcome to "Noah's Market", a bustling mom-and-pop everything store in Manhattan.

This morning, while waiting for your breakfast bagel, your Aunt Sarah pulled you aside.

"You know how Noah's been talking recently about that rug we used to have? Noah entrusted me with that rug when he was remodeling his den a few years ago. It was so old and filthy, that I sent it to the cleaners, but then I completely forgot about it.

Now, with Noah retiring and me taking over the store, he wants it back. I finally found a claim ticket saying, 'All items must be picked up within 90 days.'

I need to find that rug before Noah comes over on the last night of Hanukkah.

Do you think you could help me track down the rug?"

She hands you a USB drive labeled "Noah's Market Database Backup".

"Alex set up the backups to be password-protected. I can never remember the password itself, but it's just the year in the Hebrew calendar when Alex set up the database."`,
        question: "What's the password to open the .zip files on the USB drive?",
        hint: "The database was set up at the start of 2017. What year is 2017 in the Hebrew calendar?",
        answer: "5777",
        answerType: "text"
    },
    {
        id: 1,
        title: "The Investigator",
        story: `Sarah brought a cashier over. She said, "Joe here says that one of our customers is a skilled private investigator."

Joe nodded, "They showed me their business card, and that's what it said. Skilled Private Investigator. And their phone number was their last name spelled out.

I didn't know what that meant, but apparently before there were smartphones, people had to remember phone numbers or write them down. If you wanted a phone number that was easy-to-remember, you could get a number that spelled something using the letters printed on the phone buttons: like 2 has 'ABC', and 3 'DEF', etc.

And I guess this person had done that, so if you dialed the numbers corresponding to the letters in their name, it would call their phone number!"

Sarah said, "This person seems like they are skilled at investigation. I need them to find Noah's rug before the Hanukkah dinner."`,
        question: "Can you find this investigator's phone number?",
        hint: "Find a customer whose phone number, when converted from letters to digits using a phone keypad, spells out their last name. Phone: 2=ABC, 3=DEF, 4=GHI, 5=JKL, 6=MNO, 7=PQRS, 8=TUV, 9=WXYZ",
        answerType: "phone"
    },
    {
        id: 2,
        title: "The Contractor",
        story: `The investigator went directly to the cleaners to see if they could get any more information about the unclaimed rug.

When the investigator returned, they said, "Apparently, this cleaner had a special projects program, where they outsourced challenging cleaning projects to industrious contractors. As they're right across the street from Noah's, they usually talked about the project over coffee and bagels at Noah's before handing off the item to be cleaned. The contractors would pick up the tab and expense it, along with their cleaning supplies.

So this rug was apparently one of those special projects. The claim ticket said '2017 JP'. '2017' is the year the item was brought in, and 'JP' is the initials of the contractor.

But they stopped outsourcing a few years ago, and don't have contact information for any of these workers anymore."`,
        question: "Can you find the contractor's phone number?",
        hint: "Find a customer with initials 'JP' who bought coffee, bagels, AND cleaning supplies in 2017. Look at orders and order_items joined with products.",
        answerType: "phone"
    },
    {
        id: 3,
        title: "The Neighbor",
        story: `They called up the cleaning contractor straight away and asked about the rug.

"Oh, yeah, I did some special projects for them a few years ago. I remember that rug unfortunately. I managed to clean one section, which revealed a giant spider that startled me whenever I tried to work on it.

I already had a fear of spiders before this, but this spider was so realistic that I had a hard time making any more progress.

At last I couldn't deal with the rug taking up my whole bathtub, so I gave it to this guy who lived in my neighborhood. He said that he was naturally intuitive because he was a Cancer born in the year of the Rabbit, so maybe he was able to clean it.

I don't remember his name. Last time I saw him, he was leaving the subway and carrying a bag from Noah's."`,
        question: "Can you find the phone number of the person that the contractor gave the rug to?",
        hint: "Find a customer who: 1) Lives in the same neighborhood as the contractor (same city/zip), 2) Is a Cancer (born June 21 - July 22), 3) Was born in a Year of the Rabbit (1939, 1951, 1963, 1975, 1987, 1999, 2011)",
        answerType: "phone"
    },
    {
        id: 4,
        title: "The Early Bird",
        story: `The investigator called the phone number you found and left a message, and a man soon called back:

"Wow, that was years ago! It was quite an elegant tapestry.

It took a lot of patience, but I did manage to get the dirt out of one section, which uncovered a superb owl. I put it up on my wall, and sometimes at night I swear I could hear the owl hooting.

A few weeks later my bike chain broke on the way home, and I needed to get it fixed before work the next day. Thankfully, this woman I met on Tinder came over at 5am with her bike chain repair kit and some pastries from Noah's. Apparently she liked to get up before dawn and claim the first pastries that came out of the oven.

I didn't have any money or I would've paid her for her trouble. She really liked the tapestry, though, so I wound up giving it to her.

I don't remember her name or anything else about her."`,
        question: "Can you find the bicycle fixer's phone number?",
        hint: "Find a female customer who bought pastries (bakery items) very early in the morning (before 5am or around 5am). Look at order_time in orders.",
        answerType: "phone"
    },
    {
        id: 5,
        title: "The Cat Lady",
        story: `"Yes, I did have that tapestry for a little bit. I even cleaned a blotchy section that turned out to be a friendly koala.

But it was still really dirty, so when I was going through a Marie Kondo phase, I decided it wasn't sparking joy anymore.

I listed it on Freecycle, and a woman in Staten Island came to pick it up. She was wearing a 'Noah's Market' sweatshirt, and it was just covered in cat hair. When I suggested that a clowder of cats might ruin such a fine tapestry, she looked at me funny. She said 'I only have ten or eleven cats, and anyway they are getting quite old now, so I doubt they'd care about some old rug.'

It took her 20 minutes to stuff the tapestry into some plastic bags she brought because it was raining. I spent the evening cleaning my apartment."`,
        question: "What's the phone number of the woman from Freecycle?",
        hint: "Find a female customer from Staten Island who has bought a LOT of cat-related products (cat food, cat toys, etc.). She has 10-11 old cats.",
        answerType: "phone"
    },
    {
        id: 6,
        title: "The Bargain Hunter",
        story: `"Why yes, I did have that rug for a little while in my living room! My cats can't see a thing but they sure chased after the squirrel on it like it was dancing in front of their noses.

It was a nice rug and they were surely going to ruin it, so I gave it to my cousin, who was moving into a new place that had wood floors.

She refused to buy a new rug for herself–she said they were way too expensive. She's always been very frugal, and she clips every coupon and shops every sale at Noah's Market. In fact I like to tease her that Noah actually loses money whenever she comes in the store.

I think she's been taking it too far lately though. Once the subway fare increased, she stopped coming to visit me."`,
        question: "Can you find her cousin's phone number?",
        hint: "Find a customer who consistently pays LESS than the retail price (buys items on sale/with coupons). Compare unit_price paid vs products.retail_price. She's related to the cat lady (same last name?).",
        answerType: "phone"
    },
    {
        id: 7,
        title: "The Meet Cute",
        story: `"Oh that tapestry, with the colorful toucan on it! I'll tell you what happened to it.

One day, I was at Noah's Market, and I was just about to leave when someone behind me said 'Miss! You dropped something!'

Well I turned around to see this cute guy holding an item I had bought. He said, 'I got the same thing!' We laughed about it and wound up swapping items because I wanted the color he got. We had a moment when our eyes met and my heart stopped for a second. I asked him to get some food with me and we spent the rest of the day together.

Before long I moved into his place, but the romance faded quickly, as he wasn't the prince I imagined. I left abruptly one night, forgetting the tapestry on his wall. But by then, it symbolized our love, and I wanted nothing more to do with it. For all I know, he still has it."`,
        question: "Can you figure out her ex-boyfriend's phone number?",
        hint: "Find two customers who bought the SAME item on the SAME day at around the SAME time at Noah's Market. One is female (the bargain hunter's relative), one is male (the ex-boyfriend we're looking for).",
        answerType: "phone"
    },
    {
        id: 8,
        title: "The Collector",
        story: `"Oh that damned woman! She moved in, clogged my bathtub, left her coupons all over the kitchen, and then just vanished one night without leaving so much as a note.

Except she did leave behind that nasty carpet. I spent months cleaning one corner, only to discover a snake hiding in the branches! I knew then that she was never coming back, and I had to get it out of my sight.

Well, I don't have any storage here, and it didn't seem right to sell it, so I gave it to my sister. She wound up getting a newer and more expensive carpet, so she gave it to an acquaintance of hers who collects all sorts of junk. Apparently he owns an entire set of Noah's collectibles! He probably still has the carpet, even.

My sister is away for the holidays, but I can have her call you in a few weeks."

The family dinner is tonight!`,
        question: "Can you find the collector's phone number in time?",
        hint: "Find a customer who has collected ALL of the Noah's Market collectible items. Look for someone who has bought every item in a 'collectibles' or 'Noah's' category.",
        answerType: "phone"
    },
    {
        id: 9,
        title: "Epilogue",
        story: `"Oh yes, that magnificent Persian carpet! An absolute masterpiece, with a variety of interesting animals congregating around a Tree of Life. As a collector, I couldn't believe when it fell into my lap.

A friend of mine had taken it off her brother's hands, and she didn't know what to do with it. I saw her one day, and she was about to put an old rug out at the curb. It looked like it had been through a lot, but it was remarkably not that dirty. It still took quite a bit of effort and no small amount of rug cleaner, but ultimately I managed to get the last bits of grime out of it.

I actually live right down the street from Noah's Market–I'm a huge fan and I shop there all the time! I even have a one-of-a-kind scale model of Noah's Ark that makes a complete set of Noah's collectibles.

I would love for Noah to have his rug once again to enjoy."

🎉 Congratulations! You've solved the Hanukkah of Data Mystery! 🎉`,
        question: "",
        hint: "",
        answerType: "none"
    }
];

export function HanukkahView() {
    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const [unlockedPuzzles, setUnlockedPuzzles] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);
    const [query, setQuery] = useState('');
    const [textAnswer, setTextAnswer] = useState('');
    const [result, setResult] = useState<QueryResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(true);
    const [schemaInfo, setSchemaInfo] = useState<{ tables: string[], columns: Record<string, { name: string, type: string }[]> }>({ tables: [], columns: {} });

    const puzzle = puzzles[currentPuzzle];

    // Load schema on mount
    useEffect(() => {
        const loadSchema = async () => {
            const tableList = await getTableList('hanukkah');
            const columns: Record<string, { name: string, type: string }[]> = {};
            for (const table of tableList) {
                const schema = await getTableSchema(table, 'hanukkah');
                columns[table] = schema.map(s => ({ name: s.name, type: s.type }));
            }
            setSchemaInfo({ tables: tableList, columns });
        };
        loadSchema();
    }, []);

    // Load progress from localStorage
    useEffect(() => {
        // Clear old locked progress and ensure all puzzles are unlocked
        const allUnlocked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        setUnlockedPuzzles(allUnlocked);

        const saved = localStorage.getItem('hanukkah-progress');
        if (saved) {
            const { completed } = JSON.parse(saved);
            setCompletedPuzzles(completed || []);
        }
        // Update localStorage with all puzzles unlocked
        localStorage.setItem('hanukkah-progress', JSON.stringify({
            completed: saved ? JSON.parse(saved).completed || [] : [],
            unlocked: allUnlocked
        }));
    }, []);

    // Save progress
    const saveProgress = (completed: number[], unlocked: number[]) => {
        localStorage.setItem('hanukkah-progress', JSON.stringify({ completed, unlocked }));
    };

    const handleExecute = useCallback(async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        setFeedback(null);
        const queryResult = await executeQuery(query, 'hanukkah');
        setResult(queryResult);
        setIsLoading(false);
    }, [query]);

    const handleSubmitAnswer = () => {
        const puzzle = puzzles[currentPuzzle];

        // For puzzle 0 (password), check text answer
        if (puzzle.answerType === 'text') {
            if (textAnswer.trim() === puzzle.answer) {
                markComplete();
            } else {
                setFeedback('Fel svar. Försök igen!');
            }
            return;
        }

        // For phone puzzles, user needs to find the right phone in results
        // We just mark it complete when they click "Jag hittade svaret!"
        markComplete();
    };

    const markComplete = () => {
        if (!completedPuzzles.includes(currentPuzzle)) {
            const newCompleted = [...completedPuzzles, currentPuzzle];
            const newUnlocked = [...unlockedPuzzles];

            // Unlock next puzzle
            if (currentPuzzle < 9 && !newUnlocked.includes(currentPuzzle + 1)) {
                newUnlocked.push(currentPuzzle + 1);
            }

            setCompletedPuzzles(newCompleted);
            setUnlockedPuzzles(newUnlocked);
            saveProgress(newCompleted, newUnlocked);
            setFeedback('✓ Korrekt! Du kan nu gå vidare till nästa ljus.');
        }
    };

    const selectPuzzle = (index: number) => {
        if (unlockedPuzzles.includes(index)) {
            setCurrentPuzzle(index);
            setQuery('');
            setTextAnswer('');
            setResult(null);
            setFeedback(null);
        }
    };

    // Render candle/puzzle selector
    const renderPuzzleSelector = () => {
        // Layout: 4 on left, shamash in middle, 4 on right
        const leftCandles = [0, 1, 2, 3];
        const rightCandles = [4, 5, 6, 7];
        const collector = 8;
        const epilogue = 9;

        const renderCandle = (index: number) => {
            const isUnlocked = unlockedPuzzles.includes(index);
            const isCompleted = completedPuzzles.includes(index);
            const isCurrent = currentPuzzle === index;
            const p = puzzles[index];

            return (
                <button
                    key={index}
                    onClick={() => selectPuzzle(index)}
                    disabled={!isUnlocked}
                    className={`flex items-center gap-1 px-1 py-0.5 rounded transition-all ${isCurrent ? 'bg-amber-500/20' : ''} ${isUnlocked ? 'cursor-pointer hover:bg-zinc-700' : 'cursor-not-allowed opacity-50'
                        }`}
                    title={isUnlocked ? p.title : '🔒'}
                >
                    <span className="text-lg">
                        {isCompleted ? '🕯️' : isUnlocked ? '🪔' : '🔒'}
                    </span>
                    <span className={`text-xs ${isCurrent ? 'text-yellow-400 font-bold' : 'text-zinc-500'}`}>
                        {index}
                    </span>
                </button>
            );
        };

        return (
            <div className="flex flex-col items-center gap-1 p-2 h-full overflow-auto">
                <h3 className="text-amber-400 font-semibold text-xs">🕎</h3>

                {/* Shamash at top */}
                <div className="flex flex-col items-center">
                    <div className={`text-2xl ${completedPuzzles.length === 9 ? 'animate-bounce' : ''}`}>
                        {completedPuzzles.length === 9 ? '🌟' : '🕯️'}
                    </div>
                </div>

                {/* Vertical candles */}
                <div className="flex flex-col gap-0.5">
                    {[...leftCandles, ...rightCandles, collector, epilogue].map(renderCandle)}
                </div>

                {/* Progress */}
                <div className="text-xs text-zinc-500 mt-1">
                    {completedPuzzles.length}/9
                </div>
            </div>
        );
    };

    return (
        <div className="flex-1 flex h-[calc(100vh-56px)] bg-zinc-950">
            {/* Left: Schema */}
            <div className="w-56 border-r border-zinc-800 flex flex-col bg-zinc-900/50 overflow-hidden">
                <div className="px-3 py-2 border-b border-zinc-800 bg-zinc-900">
                    <h3 className="text-sm font-semibold text-amber-400">📋 Noah's Market Schema</h3>
                </div>
                <div className="flex-1 overflow-auto p-2 text-xs">
                    {schemaInfo.tables.map(table => (
                        <div key={table} className="mb-3">
                            <h4 className="text-fuchsia-400 font-mono font-semibold mb-1">{table}</h4>
                            <div className="pl-2 border-l border-zinc-700 space-y-0.5">
                                {schemaInfo.columns[table]?.map(col => (
                                    <div key={col.name} className="flex justify-between">
                                        <span className="text-zinc-400 font-mono">{col.name}</span>
                                        <span className="text-zinc-600">{col.type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle: Puzzle selector - smalare */}
            <div className="w-20 border-r border-zinc-800 flex flex-col bg-zinc-900/30">
                {renderPuzzleSelector()}
            </div>

            {/* Story - vänster */}
            <div className="w-1/2 border-r border-zinc-800 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
                    <div className="max-w-xl">
                        {/* Title */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">{completedPuzzles.includes(currentPuzzle) ? '🕯️' : '🪔'}</span>
                            <h1 className="text-xl font-bold text-amber-400">
                                {currentPuzzle}. {puzzle.title}
                            </h1>
                            {completedPuzzles.includes(currentPuzzle) && (
                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">✓</span>
                            )}
                        </div>

                        {/* Story */}
                        <div className="text-amber-100/90 leading-relaxed whitespace-pre-line text-sm mb-4">
                            {puzzle.story}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Question + Editor + Results */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-4 bg-zinc-950">
                    {/* Question */}
                    {puzzle.question && (
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-3">
                            <p className="text-amber-300 font-medium text-sm">
                                ❓ {puzzle.question}
                            </p>
                        </div>
                    )}

                    {/* Hint */}
                    {puzzle.hint && (
                        <div className="bg-gradient-to-br from-yellow-500/10 to-amber-600/5 border border-yellow-500/20 rounded-xl p-4 mb-4 backdrop-blur-sm">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="flex items-center gap-2 text-yellow-400 font-semibold text-sm hover:text-yellow-300 transition-colors"
                            >
                                <span className="text-lg">💡</span> 
                                <span>Ledtråd</span>
                                <span className="text-yellow-500/60 text-xs ml-1">{showHint ? '▼' : '▶'}</span>
                            </button>
                            {showHint && (
                                <div className="mt-3 pl-7 border-l-2 border-yellow-500/30">
                                    <p className="text-yellow-100/90 text-sm leading-relaxed">
                                        {puzzle.hint}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* For puzzle 0: text input */}
                    {puzzle.answerType === 'text' && (
                        <div className="flex gap-3 mb-4">
                            <input
                                type="text"
                                value={textAnswer}
                                onChange={(e) => setTextAnswer(e.target.value)}
                                placeholder="Skriv lösenordet..."
                                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
                            />
                            <button
                                onClick={handleSubmitAnswer}
                                className="px-6 py-2 bg-amber-500 text-zinc-950 font-semibold rounded-lg hover:bg-amber-400"
                            >
                                Kontrollera
                            </button>
                        </div>
                    )}

                    {/* For phone puzzles: SQL editor */}
                    {puzzle.answerType === 'phone' && (
                        <>
                            <div className="border border-zinc-700 rounded-lg overflow-hidden mb-3">
                                <div className="h-96">
                                    <SqlEditor
                                        value={query}
                                        onChange={setQuery}
                                        onExecute={handleExecute}
                                        placeholder="Skriv din SQL-fråga här..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mb-3">
                                <button
                                    onClick={handleExecute}
                                    disabled={isLoading || !query.trim()}
                                    className="flex-1 py-2 bg-fuchsia-500 text-zinc-950 font-semibold rounded-lg hover:bg-fuchsia-400 disabled:opacity-50"
                                >
                                    {isLoading ? 'Kör...' : 'Kör SQL'}
                                </button>

                                {!completedPuzzles.includes(currentPuzzle) && result && !result.error && (
                                    <button
                                        onClick={markComplete}
                                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 text-sm"
                                    >
                                        ✓ Hittade svaret!
                                    </button>
                                )}
                            </div>

                            {/* Results - scrollbar */}
                            {result && (
                                <div className="border border-zinc-700 rounded-lg overflow-hidden flex-1" style={{ maxHeight: 'calc(100vh - 480px)', minHeight: '300px' }}>
                                    <div className="overflow-auto h-full">
                                        {result.error ? (
                                            <div className="p-3 text-red-400 text-sm">{result.error}</div>
                                        ) : (
                                            <ResultsTable result={result} isLoading={isLoading} />
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Epilogue */}
                    {puzzle.answerType === 'none' && currentPuzzle === 9 && (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-2xl font-bold text-amber-400 mb-2">Grattis!</h2>
                            <p className="text-zinc-400">Du har löst alla mysterier och hittat Noahs matta!</p>
                        </div>
                    )}

                    {/* Feedback */}
                    {feedback && (
                        <div className={`mt-3 p-3 rounded-lg text-sm ${feedback.includes('Korrekt') || feedback.includes('✓')
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                            }`}>
                            {feedback}
                        </div>
                    )}

                    {/* Next button */}
                    {completedPuzzles.includes(currentPuzzle) && currentPuzzle < 9 && (
                        <div className="mt-3">
                            <button
                                onClick={() => selectPuzzle(currentPuzzle + 1)}
                                className="px-4 py-2 bg-amber-500 text-zinc-950 font-semibold rounded-lg hover:bg-amber-400 text-sm"
                            >
                                Nästa ljus →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
