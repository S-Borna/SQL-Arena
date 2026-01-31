# SQL Arena

Träna SQL genom att skriva queries. Övningar, feedback, repeat.

**Live:** <https://sql.saidborna.com>

---

## Vad är det här?

SQL Arena är ett träningsverktyg för SQL. Det är inte en kurs med videos och långa textblock. Du får en uppgift, skriver din query, kör den, ser vad som blev fel, fixar det. Repeat.

Byggt för studenter som behöver lära sig SQL inför tentamen eller för den som vill fräscha upp sina kunskaper.

---

## Features

### 🏟️ Arena

Huvudläget. Här kör du övningar uppdelade i 6 nivåer:

1. **SELECT** - Grunderna. Hämta data, välja kolumner, DISTINCT.
2. **WHERE** - Filtrering. Jämförelser, LIKE, IN, BETWEEN.
3. **ORDER BY** - Sortering och LIMIT/OFFSET för paginering.
4. **GROUP BY** - Aggregatfunktioner. COUNT, SUM, AVG, MAX, MIN + HAVING.
5. **JOIN** - Koppla ihop tabeller. INNER JOIN, LEFT JOIN, multi-table joins.
6. **Subqueries** - Nästlade queries, korrelerade subqueries, EXISTS.

Varje nivå avslutas med en Boss Query som testar allt du lärt dig.

70+ övningar totalt fördelade över tre databaser:

- **E-commerce** - Produkter, kunder, ordrar, orderrader
- **Chinook** - Musikdatabas med artister, album, spår, genrer
- **Hanukkah of Data** - Mysterie-dataset där du löser gåtor med SQL

### 💡 Ledtrådar & Facit

Varje övning har:

- **Ledtrådar** - Tips som hjälper utan att ge bort svaret
- **Facit** - Fullständig exempellösning om du kör fast

### 📋 Schema-panel

Visar tabellstrukturen för aktiv databas. Tabellnamn, kolumner och datatyper. Så du slipper gissa vad saker heter.

### 🧪 Labs

Två lägen:

**Sandbox** - Fri lek. Kör vilka queries du vill mot befintliga databaser. Perfekt för att experimentera. Reset-knapp om du förstör något.

**Bygg Databas** - Skapa din egen databas från scratch med CREATE TABLE, INSERT osv. Dina tabeller visas i sidopanelen.

**Export** - Ladda ner din databas som .sql-fil i SQLite, MySQL eller PostgreSQL-format.

### 📐 Design Studio

Normaliseringsövningar för databasdesign:

- **1NF** - Atomära värden, inga upprepande grupper
- **2NF** - Eliminera partiella beroenden
- **3NF** - Eliminera transitiva beroenden
- **Many-to-Many** - Kopplings-tabeller

Du bygger tabeller visuellt med kolumner, PK och FK. Sen validerar systemet din design.

### 📚 CheatSheet

SQL-referens i tre lägen:

- **Läs** - Bläddra genom 14 kategorier med 65+ SQL-koncept
- **Flashcards** - Vänd kort och testa dig själv
- **Quiz** - Flervalsfrågor med fyra alternativ

Täcker allt från SELECT till window functions, CTEs och transaktioner.

### 🗺️ Roadmap

Studieplan med checkpoints. Mappar övningar mot kursmål. Håller koll på vad du gjort och vad som återstår.

### 🔥 Hanukkah of Data

Speciell sektion med mystery-dataset. 8 gåtor (ljus) att lösa med SQL. Kräver att du kombinerar det du lärt dig för att hitta ledtrådar i datan.

---

## Tech Stack

| Vad | Teknik |
|-----|--------|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Bundler | Vite 7 |
| SQL Engine | sql.js (SQLite kompilerat till WebAssembly) |
| Editor | CodeMirror 6 med SQL-syntax |
| Hosting | Cloudflare Pages |
| Auth | Cloudflare D1 (SQLite) |

Allt körs i browsern. Ingen backend för SQL-exekveringen - sql.js kör SQLite direkt i WebAssembly. Databasen laddas in i minnet och queries körs lokalt.

---

## Projektstruktur

```
src/
├── components/          # UI-komponenter
│   ├── CheatSheet.tsx   # SQL-referens med flashcards & quiz
│   ├── Navigation.tsx   # Top bar navigation
│   ├── SqlEditor.tsx    # CodeMirror wrapper
│   ├── ResultsTable.tsx # Query-resultat tabell
│   └── DiagnosticsPanel.tsx
│
├── views/               # Sidor/lägen
│   ├── ArenaView.tsx    # Huvudövningsläget
│   ├── LabsView.tsx     # Sandbox, bygg DB, lär dig SQL
│   ├── DesignStudioView.tsx # Normaliseringsövningar
│   ├── HanukkahView.tsx # Mystery-gåtor
│   ├── RoadmapView.tsx  # Studieplan
│   └── LandingPage.tsx  # Startsida
│
├── engine/              # SQL-logik
│   ├── sqlRunner.ts     # Exekverar queries via sql.js
│   └── coachEngine.ts   # Validerar svar, ger diagnostik
│
├── data/                # Övningar & seed-data
│   ├── exercises.ts     # 70+ övningar med lösningar
│   ├── courseGoals.ts   # Kursmålsmapping
│   └── seeds/           # SQL-filer för databaser
│       ├── ecommerce.sql
│       ├── chinook.sql
│       ├── hanukkah.sql
│       └── school.sql
│
├── auth/                # Autentisering
│   ├── AuthContext.tsx  # React context för login
│   ├── AuthModal.tsx    # Login/signup modal
│   └── UserMenu.tsx     # Användarmeny
│
├── state/               # Global state
│   └── EditorState.tsx  # Sparar query mellan vyer
│
└── types/               # TypeScript-typer
    └── index.ts
```

---

## Databaser

### E-commerce

```
customers (customer_id, customer_name, email, city)
products (product_id, product_name, category, price, stock_quantity)
orders (order_id, customer_id, order_date, status)
order_items (order_item_id, order_id, product_id, quantity, unit_price)
```

### Chinook

```
artists (ArtistId, Name)
albums (AlbumId, Title, ArtistId)
tracks (TrackId, Name, AlbumId, GenreId, Milliseconds, UnitPrice)
genres (GenreId, Name)
+ fler tabeller för playlists, invoices, employees
```

### Hanukkah of Data

```
customers (customer_id, name, phone, address, city, zip_code, birthdate)
products (product_id, product_name, wholesale_cost, retail_price)
orders (order_id, customer_id, order_date, order_time)
order_items (order_id, product_id, qty, unit_price)
```

---

## Köra lokalt

```bash
# Klona
git clone <repo>
cd sql-arena

# Installera dependencies
npm install

# Starta dev server
npm run dev
```

---

## Övningsformat

Varje övning i `exercises.ts` ser ut så här:

```typescript
{
  id: 'where-005',
  level: 2,
  category: 'where',
  title: 'Flera kategorier',
  brief: 'Visa produkter som är Electronics eller Books.',
  database: 'ecommerce',
  expectedColumns: ['product_name', 'category'],
  hints: [
    'Använd IN för att matcha flera värden',
    'IN tar en lista med värden inom parenteser'
  ],
  solution: "SELECT product_name, category FROM products WHERE category IN ('Electronics', 'Books')",
  courseGoals: [1],
  difficulty: 'intermediate'
}
```

Validering sker genom att jämföra:

- Kolumnnamn i resultatet
- Antal rader (om specificerat)
- Att query kör utan fel

---

## Coach Engine

Diagnostik-motorn i `coachEngine.ts` ger feedback utan att använda AI. Den kollar:

- Saknade kolumner
- Fel kolumnordning
- Fel antal rader
- Syntax-fel (parsas av sql.js)
- Vanliga misstag (GROUP BY utan aggregat, JOIN utan ON, etc.)

Feedbacken är kort och konkret: vad som är fel + en riktning för fix.

---

## Konto & Progress

Sidan fungerar helt utan inloggning - alla funktioner är tillgängliga direkt.

**Utan konto:**

- Full tillgång till allt
- Queries sparas under sessionen
- Stänger du fliken försvinner allt

**Med konto (gratis):**

- Avklarade övningar sparas permanent
- Fortsätt där du slutade nästa gång

**Viktigt att veta:**

- 🧪 Egna databaser i Labs försvinner om du inte exporterar dem som .sql-fil

---

## Begränsningar

- sql.js stödjer SQLite-syntax, inte MySQL/PostgreSQL-specifik syntax
- Kräver JavaScript aktiverat
- Fungerar bäst på desktop (responsivt men optimerat för större skärm)

---

## Licens

MIT

---

Designat och byggt med ❤️ för DevOps Ingenjörer av **Said Borna**
