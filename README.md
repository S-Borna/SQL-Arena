# 🗃️ SQL Quest - Den Definitiva SQL-resursen på Svenska

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/Website-sql.saidborna.com-blue)](https://sql.saidborna.com)

> **Gratis, open source SQL-utbildning på svenska. Från nybörjare till proffs på 7 dagar.**

🌐 **Live:** [sql.saidborna.com](https://sql.saidborna.com)

---

## 🎯 Varför SQL Quest?

SQL är det mest eftertraktade verktyget för datahantering - men de flesta resurser är på engelska, fragmenterade, eller kostar pengar.

**SQL Quest ändrar det.**

- ✅ **100% Gratis** - Inga dolda kostnader, inga prenumerationer
- ✅ **Open Source** - Fork:a, förbättra, bidra
- ✅ **Svenska** - Hela kursen på svenska
- ✅ **Praktiskt** - 82+ interaktiva övningar med facit
- ✅ **Modern** - SQL.js körs direkt i webbläsaren
- ✅ **AI-hjälp** - Integrerad ChatGPT-assistent
- ✅ **DevOps-fokus** - Bonus för Chas Academy DevOps-studenter

---

## 📚 Kursöversikt

### Dag 1: Introduktion & SELECT

- Vad är en databas? SQL vs NoSQL, ACID vs BASE
- SELECT-satser, kolumner, *
- 15 övningar

### Dag 2: Filtrera & Sortera

- WHERE, AND, OR, NOT
- ORDER BY, LIMIT, OFFSET
- LIKE, IN, BETWEEN
- 15 övningar

### Dag 3: Aggregering

- COUNT, SUM, AVG, MIN, MAX
- GROUP BY & HAVING
- NULL-hantering
- 15 övningar

### Dag 4: JOINs

- INNER JOIN, LEFT JOIN, RIGHT JOIN
- Multiple JOINs
- Self-joins
- 10 övningar

### Dag 5: Modifiera Data

- CREATE TABLE, PRIMARY KEY, FOREIGN KEY
- INSERT, UPDATE, DELETE
- DROP TABLE
- 10 övningar

### Dag 6: Normalisering

- 1NF, 2NF, 3NF
- Denormalisering
- Databasdesign
- 7 övningar

### Dag 7: Avancerat

- Subqueries
- Views
- Transactions (ACID)
- Python + SQLite integration
- 10 övningar

---

## 🛠️ DevOps Bonusinnehåll

Speciellt för Chas Academy DevOps-studenter:

- **💾 Backup & Recovery** - 3-2-1 regel, mysqldump, pg_dump
- **🔐 Säkerhet** - SQL injection, GRANT/REVOKE, kryptering
- **📊 Monitoring** - Slow query log, EXPLAIN ANALYZE, metrics
- **🤖 Automation** - Migrations, CI/CD, Docker, Terraform
- **🔄 Replikering** - Primary-Replica, failover
- **☁️ Cloud** - AWS RDS, Azure SQL, GCP Cloud SQL, Supabase

---

## 🚀 Kom igång

### Använd online (rekommenderat)

Besök [sql.saidborna.com](https://sql.saidborna.com)

### Kör lokalt

```bash
# Klona
git clone https://github.com/saidborna/sql-quest.git
cd sql-quest

# Starta server
python3 -m http.server 8080

# Öppna i webbläsaren
open http://localhost:8080
```

---

## 🏗️ Teknisk Stack

| Teknologi | Användning |
|-----------|------------|
| **SQL.js 1.8.0** | SQLite kompilerad till WebAssembly |
| **Vanilla JS** | Inga frameworks, snabb laddning |
| **OpenAI API** | Valfri AI-assistent (GPT-4o-mini) |
| **localStorage** | Sparar progress lokalt |
| **Supabase** | Valfri cloud-backup (PostgreSQL) |

---

## 📁 Projektstruktur

```
sql-quest/
├── index.html                  # Huvudapplikation (allt-i-ett)
├── CNAME                       # Custom domain för GitHub Pages
├── DEPLOY.md                   # Deployment-guide
├── README.md                   # Du läser denna fil
├── js/
│   ├── theory.js               # Komplett teori (7 dagar, ~1200 rader)
│   ├── exercises-complete.js   # 82 övningar med validering
│   ├── solutions-complete.js   # Detaljerade lösningar med förklaringar
│   └── devops-content.js       # DevOps-bonus (6 moduler)
└── css/
    └── style.css               # Extra styles (optional)
```

---

## 🎮 Funktioner

### Interaktiv SQL Editor

- Skriv och kör SQL direkt i webbläsaren
- Ctrl+Enter för snabbkörning
- Syntax highlighting
- Resultat visas i tabell

### Gamification

- 🔥 Tänd ljus för varje klarad dag
- Progressbar visar framsteg
- Svårighetsgrader: Easy/Medium/Hard

### Hjälpsystem

- 💡 **Ledtrådar** - Hints utan att avslöja svaret
- 📖 **Lösningar** - Detaljerade steg-för-steg förklaringar
- 🤖 **AI-assistent** - ChatGPT-integration

### Databas-schema

Svenska tabeller för realistisk övning:

- `produkter` - Produktkatalog
- `kunder` - Kundregister
- `ordrar` - Orderhistorik
- `orderrader` - Orderprodukter
- `anstalda` - Personalregister
- `kategorier` - Produktkategorier

---

## 🤖 AI-Assistent Setup

1. Gå till [platform.openai.com](https://platform.openai.com/api-keys)
2. Skapa API-nyckel
3. Klistra in i Inställningar (⚙️)
4. Chatta med AI för hjälp!

---

## 🌐 Deployment

Se [DEPLOY.md](DEPLOY.md) för fullständiga instruktioner:

- **GitHub Pages** (gratis, rekommenderat)
- **Vercel** (gratis)
- **Netlify** (gratis)

Custom domain: `sql.saidborna.com`

---

## 🤝 Bidra

Pull requests välkomnas!

```bash
# 1. Fork projektet på GitHub

# 2. Klona din fork
git clone https://github.com/DITT-NAMN/sql-quest.git

# 3. Skapa feature branch
git checkout -b feature/ny-ovning

# 4. Gör ändringar och commita
git commit -m "Lägg till ny övning"

# 5. Pusha
git push origin feature/ny-ovning

# 6. Öppna Pull Request på GitHub
```

### Idéer för bidrag

- Fler övningar
- Bättre förklaringar
- Nya DevOps-moduler
- Buggfixar
- Översättningar

---

## 📜 Licens

MIT License - Gör vad du vill med koden!

```
MIT License
Copyright (c) 2024 Said Borna
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Erkännanden

- **Chas Academy** - DevOps-utbildning
- **IBM/Coursera** - Kursstruktur inspiration
- **SQL.js** - WebAssembly SQLite
- **OpenAI** - AI-assistent

---

## 📞 Kontakt

- **Website:** [saidborna.com](https://saidborna.com)
- **GitHub:** [@saidborna](https://github.com/saidborna)

---

<p align="center">
  <strong>⭐ Stjärnmärk detta repo om det hjälpte dig!</strong><br><br>
  <em>Gjort med ❤️ i Sverige</em><br><br>
  <img src="https://img.shields.io/badge/Made%20with-Love-red" alt="Made with love">
</p>
