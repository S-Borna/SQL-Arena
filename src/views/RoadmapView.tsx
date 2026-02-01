import { useState } from 'react';
import { courseGoals } from '../data/courseGoals';

interface RoadmapViewProps {
  onNavigateToArena: () => void;
}

interface RoadmapBlock {
  id: number;
  title: string;
  hours: string;
  description: string;
  courseGoals: number[];
  topics: string[];
  exercises: string[];
  caseStudy: { title: string; description: string };
  checkpoint: string;
  vgGate: string;
}

const roadmapBlocks: RoadmapBlock[] = [
  {
    id: 1,
    title: 'SQL Fundamentals',
    hours: '0-12h',
    description: 'Grundläggande SQL-syntax och SELECT-satser',
    courseGoals: [1, 2, 9],
    topics: [
      'SELECT och FROM-syntax',
      'WHERE-villkor och operatorer',
      'ORDER BY och LIMIT',
      'DISTINCT och alias',
      'SQLite vs MySQL/MariaDB skillnader'
    ],
    exercises: [
      'Arena Nivå 1: SELECT (10 övningar)',
      'Arena Nivå 2: WHERE (10 övningar)',
      'Arena Nivå 3: ORDER BY (10 övningar)'
    ],
    caseStudy: {
      title: 'E-handelsrapport',
      description: 'Skapa en produktkatalog med filtrering och sortering för en webbshop.'
    },
    checkpoint: 'Skriv 5 SELECT-satser med WHERE, ORDER BY och LIMIT',
    vgGate: 'Klara Boss Query på nivå 1-3 utan hints'
  },
  {
    id: 2,
    title: 'Aggregering och Gruppering',
    hours: '12-24h',
    description: 'Aggregatfunktioner, GROUP BY och HAVING',
    courseGoals: [1, 6],
    topics: [
      'COUNT, SUM, AVG, MIN, MAX',
      'GROUP BY för kategorisering',
      'HAVING för filtrering efter aggregering',
      'Kombinera aggregat med WHERE',
      'Nested aggregat'
    ],
    exercises: [
      'Arena Nivå 4: GROUP BY (10 övningar)',
      'Performance Lab: Jämför aggregat med och utan index'
    ],
    caseStudy: {
      title: 'Försäljningsanalys',
      description: 'Analysera försäljningsdata per kategori, månad och region.'
    },
    checkpoint: 'Skapa 3 aggregeringsrapporter med GROUP BY och HAVING',
    vgGate: 'Optimera en aggregeringsfråga med index och visa prestandaförbättring'
  },
  {
    id: 3,
    title: 'Relationer och JOIN',
    hours: '24-36h',
    description: 'Koppla tabeller med olika JOIN-typer',
    courseGoals: [1, 5, 12],
    topics: [
      'INNER JOIN',
      'LEFT och RIGHT JOIN',
      'Self-join',
      'Multiple joins',
      'Join med aggregat'
    ],
    exercises: [
      'Arena Nivå 5: JOIN (10 övningar)',
      'Hanukkah Mystery: Övningar 1-6'
    ],
    caseStudy: {
      title: 'Kundorderrapport',
      description: 'Bygg en komplett rapport som kopplar kunder, ordrar och produkter.'
    },
    checkpoint: 'Skriv 5 frågor med minst 3 tabeller vardera',
    vgGate: 'Lös Hanukkah Mystery 1-6 utan hints'
  },
  {
    id: 4,
    title: 'Subqueries och Avancerad SQL',
    hours: '36-48h',
    description: 'Subqueries, korrelerade frågor och avancerade tekniker',
    courseGoals: [1, 6],
    topics: [
      'Subqueries i WHERE',
      'Subqueries i FROM',
      'Korrelerade subqueries',
      'EXISTS och IN',
      'CASE-uttryck'
    ],
    exercises: [
      'Arena Nivå 6: Subqueries (10 övningar)',
      'Hanukkah Mystery: Övningar 7-12'
    ],
    caseStudy: {
      title: 'Komplex affärsanalys',
      description: 'Analysera kundbeteende med ranking och jämförelser mot genomsnitt.'
    },
    checkpoint: 'Skriv 3 korrelerade subqueries som löser verkliga problem',
    vgGate: 'Klara alla Boss Queries nivå 4-6'
  },
  {
    id: 5,
    title: 'Databasdesign och Normalisering',
    hours: '48-60h',
    description: 'Designprinciper, normalformer och dataintegritet',
    courseGoals: [5, 7, 10, 12, 13],
    topics: [
      'Första normalformen (1NF)',
      'Andra normalformen (2NF)',
      'Tredje normalformen (3NF)',
      'Primary och Foreign Keys',
      'Constraints och dataintegritet',
      'ER-diagram och relationstyper'
    ],
    exercises: [
      'Design Studio: 6 normaliseringsövningar',
      'DDL Lab: CREATE TABLE med constraints'
    ],
    caseStudy: {
      title: 'Designa skolsystem',
      description: 'Designa en normaliserad databas för kurshantering från grunden.'
    },
    checkpoint: 'Normalisera en given tabell till 3NF med motivering',
    vgGate: 'Skriv ett designdokument som motiverar alla designval kopplat till kursmål 13'
  },
  {
    id: 6,
    title: 'Optimering, Backup och Python',
    hours: '60-72h',
    description: 'Index, prestanda, backup/restore och Python-integration',
    courseGoals: [3, 4, 8, 11, 14],
    topics: [
      'Index och EXPLAIN',
      'Query optimization',
      'Backup och restore',
      'Python sqlite3 modul',
      'Python mysql-connector',
      'Molnlagring med MinIO'
    ],
    exercises: [
      'Performance Lab: Index-experiment',
      'Python Labs: 6 övningar + miniprojekt',
      'Cloud Lab: Backup till MinIO'
    ],
    caseStudy: {
      title: 'Python CLI-verktyg',
      description: 'Bygg ett Python-program som genererar rapporter från databasen.'
    },
    checkpoint: 'Skapa ett Python-script som läser och skriver till databas',
    vgGate: 'Implementera backup-rutin och visa restore fungerar korrekt'
  }
];

export function RoadmapView({ onNavigateToArena }: RoadmapViewProps) {
  const [expandedBlock, setExpandedBlock] = useState<number | null>(1);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">72h Roadmap</h1>
          <p className="text-zinc-400">
            Från nybörjare till VG-nivå. Varje block är cirka 12 timmar och täcker specifika kursmål.
          </p>
        </div>

        <div className="mb-8 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h2 className="text-sm font-semibold text-zinc-300 mb-3">Alla 14 kursmål</h2>
          <div className="grid grid-cols-2 gap-2">
            {courseGoals.map(goal => (
              <div key={goal.id} className="flex items-start gap-2 text-sm">
                <span className="px-1.5 py-0.5 bg-zinc-800 text-blue-400 rounded text-xs font-mono">
                  {goal.id}
                </span>
                <span className="text-zinc-400">{goal.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {roadmapBlocks.map(block => (
            <div
              key={block.id}
              className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50"
            >
              <button
                onClick={() => setExpandedBlock(expandedBlock === block.id ? null : block.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    {block.id}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-zinc-100">{block.title}</h3>
                    <p className="text-sm text-zinc-500">{block.hours} | {block.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {block.courseGoals.map(id => (
                      <span key={id} className="px-1.5 py-0.5 bg-zinc-800 text-blue-400 text-xs rounded font-mono">
                        {id}
                      </span>
                    ))}
                  </div>
                  <span className="text-zinc-500 text-xl">
                    {expandedBlock === block.id ? '−' : '+'}
                  </span>
                </div>
              </button>

              {expandedBlock === block.id && (
                <div className="px-6 pb-6 space-y-6 animate-slide-up">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-300 mb-3">Ämnen</h4>
                      <ul className="space-y-2">
                        {block.topics.map((topic, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="text-blue-500 mt-1">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-zinc-300 mb-3">Övningar</h4>
                      <ul className="space-y-2">
                        {block.exercises.map((exercise, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-zinc-400">
                            <span className="text-green-500 mt-1">▸</span>
                            {exercise}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-800/50 rounded-lg">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">
                      Case Study: {block.caseStudy.title}
                    </h4>
                    <p className="text-sm text-zinc-400">{block.caseStudy.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-800/50 rounded-lg border-l-2 border-blue-500">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Checkpoint</h4>
                      <p className="text-sm text-zinc-400">{block.checkpoint}</p>
                    </div>

                    <div className="p-4 bg-zinc-800/50 rounded-lg border-l-2 border-yellow-500">
                      <h4 className="text-sm font-semibold text-yellow-400 mb-2">VG Gate</h4>
                      <p className="text-sm text-zinc-400">{block.vgGate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={onNavigateToArena}
                      className="px-4 py-2 bg-blue-500 text-zinc-950 font-semibold rounded-lg hover:bg-blue-400 transition-colors"
                    >
                      Starta övningar
                    </button>
                    <span className="text-xs text-zinc-500">
                      Täcker kursmål: {block.courseGoals.join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
