# 🚀 Deployment Guide för sql.saidborna.com

## Snabbast: GitHub Pages (Gratis)

### 1. Skapa repository

```bash
cd /Users/mrebadi/Desktop/DevOps/SQL/SQL-Workshop
git init
git add .
git commit -m "SQL Quest - Den definitiva SQL-resursen"
git branch -M main
git remote add origin https://github.com/saidborna/sql-quest.git
git push -u origin main
```

### 2. Aktivera GitHub Pages

1. Gå till repository → Settings → Pages
2. Source: Deploy from branch → main → / (root)
3. Save

### 3. Custom Domain

1. I GitHub Pages settings, skriv: `sql.saidborna.com`
2. Lägg till DNS-record hos din domänleverantör:

```
Type: CNAME
Name: sql
Value: saidborna.github.io
TTL: 3600
```

### 4. CNAME-fil (redan skapad)

Filen `CNAME` med `sql.saidborna.com` måste finnas i root.

---

## Alternativ: Vercel (Rekommenderas)

### 1. Installera Vercel CLI

```bash
npm i -g vercel
```

### 2. Deploy

```bash
cd /Users/mrebadi/Desktop/DevOps/SQL/SQL-Workshop
vercel
```

### 3. Lägg till custom domain i Vercel Dashboard

1. Gå till project settings → Domains
2. Lägg till: sql.saidborna.com
3. Följ DNS-instruktionerna

---

## Alternativ: Netlify

### 1. Drag & Drop

1. Gå till [app.netlify.com](https://app.netlify.com)
2. Dra SQL-Workshop-mappen till sidan
3. Done!

### 2. Custom domain

1. Site settings → Domain management
2. Add custom domain: sql.saidborna.com
3. Lägg till DNS:

```
Type: CNAME
Name: sql
Value: [your-site-name].netlify.app
```

---

## DNS-inställningar sammanfattning

Oavsett hosting-metod behöver du lägga till detta hos din DNS-leverantör:

| Type | Name | Value |
|------|------|-------|
| CNAME | sql | [din-hosting-url] |

Eller om du använder apex domain (saidborna.com):

| Type | Name | Value |
|------|------|-------|
| A | @ | [IP från hosting] |
| CNAME | sql | saidborna.com |

---

## Filstruktur som deployas

```
SQL-Workshop/
├── index.html          # Huvudsida
├── CNAME               # För GitHub Pages custom domain
├── README.md           # Projektbeskrivning
├── js/
│   ├── theory.js           # Komplett teori (7 dagar)
│   ├── exercises-complete.js   # 82 övningar
│   ├── solutions-complete.js   # Detaljerade lösningar
│   └── devops-content.js       # DevOps bonusinnehåll
└── css/
    └── style.css       # Extra styles (optional)
```

---

## SSL/HTTPS

- **GitHub Pages**: Automatiskt via Let's Encrypt
- **Vercel**: Automatiskt
- **Netlify**: Automatiskt

---

## Efter deployment

Testa att allt fungerar:

1. Besök <https://sql.saidborna.com>
2. Testa att köra SQL-frågor
3. Kolla att AI-assistenten fungerar (kräver API-nyckel)
4. Verifiera att progress sparas i localStorage

---

## Uppdateringar

### GitHub Pages

```bash
git add .
git commit -m "Uppdatering"
git push
```

### Vercel

```bash
vercel --prod
```

### Netlify

Dra nya filer eller koppla till GitHub för auto-deploy.
