import { useState } from 'react';

interface CheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const cheatSheetData = {
  'Grundläggande': [
    { syntax: 'SELECT', desc: 'Väljer kolumner', example: 'SELECT namn, pris FROM produkter;' },
    { syntax: 'SELECT *', desc: 'Väljer alla kolumner', example: 'SELECT * FROM kunder;' },
    { syntax: 'SELECT DISTINCT', desc: 'Unika värden', example: 'SELECT DISTINCT stad FROM kunder;' },
    { syntax: 'AS', desc: 'Alias för kolumn/tabell', example: 'SELECT namn AS produktnamn FROM produkter;' },
  ],
  'Filtrering': [
    { syntax: 'WHERE', desc: 'Filtrera rader', example: "SELECT * FROM kunder WHERE stad = 'Stockholm';" },
    { syntax: 'AND / OR', desc: 'Kombinera villkor', example: 'SELECT * FROM produkter WHERE pris > 100 AND kategori = 1;' },
    { syntax: 'IN', desc: 'Matcha lista av värden', example: "SELECT * FROM kunder WHERE stad IN ('Stockholm', 'Malmö');" },
    { syntax: 'BETWEEN', desc: 'Värde inom intervall', example: 'SELECT * FROM produkter WHERE pris BETWEEN 50 AND 100;' },
    { syntax: 'LIKE', desc: 'Mönstermatchning', example: "SELECT * FROM kunder WHERE namn LIKE 'A%';" },
    { syntax: 'IS NULL / IS NOT NULL', desc: 'Kontroll för NULL', example: 'SELECT * FROM kunder WHERE email IS NOT NULL;' },
  ],
  'Sortering & Begränsning': [
    { syntax: 'ORDER BY', desc: 'Sortera resultat', example: 'SELECT * FROM produkter ORDER BY pris DESC;' },
    { syntax: 'ASC / DESC', desc: 'Stigande/Fallande', example: 'SELECT * FROM kunder ORDER BY namn ASC;' },
    { syntax: 'LIMIT', desc: 'Begränsa antal rader', example: 'SELECT * FROM produkter LIMIT 10;' },
    { syntax: 'OFFSET', desc: 'Hoppa över rader', example: 'SELECT * FROM produkter LIMIT 10 OFFSET 20;' },
  ],
  'Aggregatfunktioner': [
    { syntax: 'COUNT()', desc: 'Räkna rader', example: 'SELECT COUNT(*) FROM kunder;' },
    { syntax: 'SUM()', desc: 'Summera värden', example: 'SELECT SUM(pris) FROM ordrar;' },
    { syntax: 'AVG()', desc: 'Medelvärde', example: 'SELECT AVG(pris) FROM produkter;' },
    { syntax: 'MIN() / MAX()', desc: 'Minsta/Största värde', example: 'SELECT MIN(pris), MAX(pris) FROM produkter;' },
    { syntax: 'GROUP BY', desc: 'Gruppera för aggregering', example: 'SELECT kategori, COUNT(*) FROM produkter GROUP BY kategori;' },
    { syntax: 'HAVING', desc: 'Filtrera grupper', example: 'SELECT kategori, COUNT(*) FROM produkter GROUP BY kategori HAVING COUNT(*) > 5;' },
  ],
  'JOINs': [
    { syntax: 'INNER JOIN', desc: 'Matchande rader i båda', example: 'SELECT * FROM ordrar INNER JOIN kunder ON ordrar.kund_id = kunder.id;' },
    { syntax: 'LEFT JOIN', desc: 'Alla från vänster + matchande', example: 'SELECT * FROM kunder LEFT JOIN ordrar ON kunder.id = ordrar.kund_id;' },
    { syntax: 'RIGHT JOIN', desc: 'Alla från höger + matchande', example: 'SELECT * FROM ordrar RIGHT JOIN kunder ON ordrar.kund_id = kunder.id;' },
    { syntax: 'FULL OUTER JOIN', desc: 'Alla från båda tabeller', example: 'SELECT * FROM a FULL OUTER JOIN b ON a.id = b.a_id;' },
    { syntax: 'CROSS JOIN', desc: 'Kartesisk produkt', example: 'SELECT * FROM färger CROSS JOIN storlekar;' },
  ],
  'Subqueries': [
    { syntax: 'Subquery i WHERE', desc: 'Fråga som filter', example: 'SELECT * FROM produkter WHERE pris > (SELECT AVG(pris) FROM produkter);' },
    { syntax: 'Subquery i FROM', desc: 'Härledd tabell', example: 'SELECT * FROM (SELECT * FROM kunder WHERE aktiv = 1) AS aktiva;' },
    { syntax: 'EXISTS', desc: 'Kontroll om subquery ger resultat', example: 'SELECT * FROM kunder k WHERE EXISTS (SELECT 1 FROM ordrar WHERE kund_id = k.id);' },
  ],
  'DDL (Struktur)': [
    { syntax: 'CREATE TABLE', desc: 'Skapa tabell', example: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);' },
    { syntax: 'ALTER TABLE', desc: 'Ändra tabell', example: 'ALTER TABLE users ADD COLUMN email TEXT;' },
    { syntax: 'DROP TABLE', desc: 'Ta bort tabell', example: 'DROP TABLE users;' },
    { syntax: 'CREATE INDEX', desc: 'Skapa index', example: 'CREATE INDEX idx_name ON users(name);' },
  ],
  'DML (Data)': [
    { syntax: 'INSERT INTO', desc: 'Lägg till rad', example: "INSERT INTO users (name, email) VALUES ('Anna', 'anna@test.se');" },
    { syntax: 'UPDATE', desc: 'Uppdatera rader', example: "UPDATE users SET name = 'Erik' WHERE id = 1;" },
    { syntax: 'DELETE', desc: 'Ta bort rader', example: 'DELETE FROM users WHERE id = 1;' },
  ],
  'SQLite-specifikt': [
    { syntax: 'INTEGER PRIMARY KEY', desc: 'Auto-increment ID', example: 'id INTEGER PRIMARY KEY' },
    { syntax: 'AUTOINCREMENT', desc: 'Strikt auto-increment', example: 'id INTEGER PRIMARY KEY AUTOINCREMENT' },
    { syntax: 'PRAGMA', desc: 'Databasinställningar', example: 'PRAGMA table_info(users);' },
    { syntax: "strftime()", desc: 'Datumformatering', example: "SELECT strftime('%Y-%m', datum) FROM ordrar;" },
  ],
  'MySQL/MariaDB': [
    { syntax: 'AUTO_INCREMENT', desc: 'Auto-increment', example: 'id INT AUTO_INCREMENT PRIMARY KEY' },
    { syntax: 'NOW()', desc: 'Nuvarande datum/tid', example: 'INSERT INTO log (skapad) VALUES (NOW());' },
    { syntax: 'DATE_FORMAT()', desc: 'Formatera datum', example: "SELECT DATE_FORMAT(datum, '%Y-%m') FROM ordrar;" },
    { syntax: 'LIMIT offset, count', desc: 'MySQL LIMIT syntax', example: 'SELECT * FROM users LIMIT 10, 5;' },
  ],
  'PostgreSQL': [
    { syntax: 'SERIAL', desc: 'Auto-increment', example: 'id SERIAL PRIMARY KEY' },
    { syntax: 'RETURNING', desc: 'Returnera efter INSERT', example: "INSERT INTO users (name) VALUES ('Test') RETURNING id;" },
    { syntax: 'ILIKE', desc: 'Case-insensitive LIKE', example: "SELECT * FROM users WHERE name ILIKE '%anna%';" },
    { syntax: '::type', desc: 'Type casting', example: "SELECT '123'::INTEGER;" },
  ],
};

export function CheatSheet({ isOpen, onClose }: CheatSheetProps) {
  const [activeCategory, setActiveCategory] = useState('Grundläggande');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-700 rounded-xl w-[90vw] max-w-5xl h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl font-bold text-white">SQL Cheat Sheet</h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-2xl px-2"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Category sidebar */}
          <div className="w-48 border-r border-zinc-700 overflow-y-auto p-2">
            {Object.keys(cheatSheetData).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === category
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Commands list */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid gap-3">
              {cheatSheetData[activeCategory as keyof typeof cheatSheetData]?.map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 hover:border-zinc-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <code className="text-cyan-400 font-mono font-semibold text-lg">
                      {item.syntax}
                    </code>
                    <span className="text-zinc-400 text-sm">{item.desc}</span>
                  </div>
                  <pre className="bg-zinc-900 rounded-lg p-3 text-sm text-green-400 font-mono overflow-x-auto">
                    {item.example}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-700 text-xs text-zinc-500 flex justify-between">
          <span>SQLite • MySQL/MariaDB • PostgreSQL</span>
          <span>Tryck ESC för att stänga</span>
        </div>
      </div>
    </div>
  );
}
