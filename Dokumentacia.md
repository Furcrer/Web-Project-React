# Budúci Bakalári - Kompletná Dokumentácia

**Budúci Bakalári** je full-stack webová aplikácia vyvinutá študentami TUKE (Technická Univerzita v Košiciach). Projekt demonštruje moderné postupy vývoja webových aplikácií vrátane responzívneho dizajnu, autentifikácie používateľov, správy databázy a dynamickej správy obsahu.

---

## 📋 Obsah Dokumentácie

1. [Architektúra riešenia](#architektúra-riešenia)
2. [Použité technológie](#použité-technológie)
3. [Inštrukcie na spustenie](#inštrukcie-na-spustenie)
4. [Štruktúra projektu](#štruktúra-projektu)
5. [Frontend Dokumentácia](#frontend-dokumentácia)
6. [Backend Dokumentácia](#backend-dokumentácia)
7. [Bezpečnosť](#bezpečnosť)

---

## Architektúra riešenia

### Diagram architektúry

```
┌──────────────────────────────────────────────────────────────┐
│                  KLIENT - FRONTEND (React)                   │
│  ├─ Stránky (Login, Dashboard, Profil, Domov...)            │
│  ├─ Komponenty (Header, Footer, Formuláre...)               │
│  ├─ State Management (React Hooks - useState)               │
│  └─ CSS (Responzívny dizajn - Flexbox, Grid)               │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTP/AJAX Požiadavky (JSON)
                         │ CORS Headers
                         ↓
┌──────────────────────────────────────────────────────────────┐
│              SERVER - BACKEND (PHP API)                      │
│  ├─ Autentifikácia (login.php, register.php)               │
│  ├─ Správa Používateľov (get_users.php, delete_account.php)│
│  ├─ Správa Produktov (find_products.php, update_product.php)│
│  ├─ Validácia údajov (server-side)                          │
│  ├─ Ochrana XSS a SQL Injection                             │
│  └─ Databázové Pripojenie (PDO)                             │
└────────────────────────┬─────────────────────────────────────┘
                         │ SQL Dotazy
                         ↓
┌──────────────────────────────────────────────────────────────┐
│           DATABÁZA - MySQL (názov: cenovky)                  │
│  ├─ users (id, meno, email, heslo, rok_narodenia...)       │
│  ├─ products (id, nazev, popis, cena...)                   │
│  └─ categories (id, nazev, popis...)                        │
└──────────────────────────────────────────────────────────────┘
```

### Tok Údajov v Aplikácii

#### 1. **Autentifikácia Používateľa**
```
User -> Login Page (frontend) 
  -> POST /backend/login.php (email, password) 
  -> Backend validácia 
  -> MySQL query 
  -> Vrátenie user objektu 
  -> localStorage úschova 
  -> Presmerovanie na /dashboard
```

#### 2. **Načítanie Zoznamu Používateľov**
```
Dashboard Page (frontend) 
  -> GET /backend/get_users.php?filterType=meno&filterValue=value 
  -> Backend aplikuje filter a sort 
  -> MySQL query 
  -> JSON response 
  -> Render tabuľky
```

#### 3. **Vymazanie Účtu**
```
Profile Page (frontend - potvrdenie) 
  -> POST /backend/delete_my_account.php (id) 
  -> Backend validácia 
  -> MySQL DELETE 
  -> localStorage clear 
  -> Presmerovanie na /login
```

#### 4. **Vyhľadávanie Produktov**
```
Print Page (frontend) 
  -> GET /backend/find_products.php?q=search_term 
  -> Backend LIKE search 
  -> MySQL query 
  -> JSON response 
  -> Render výsledkov
```

---

## Použité technológie

### Frontend Stack
| Technológia | Verzia | Účel |
|------------|--------|------|
| **React** | 18.x | UI Framework - Komponenty, State Management |
| **React Router** | 6.x | Klient-side routing (/login, /dashboard, /profile...) |
| **Font Awesome** | 6.4.0 | Ikony (fa-motorcycle, fa-dumbbell, etc.) |
| **CSS3** | - | Styling - Flexbox, Grid, Media Queries, CSS Variables |
| **JavaScript (ES6+)** | - | Logika aplikácie, fetch API |

### Backend Stack
| Technológia | Verzia | Účel |
|------------|--------|------|
| **PHP** | 7.4+ | Server-side logika, API endpoints |
| **PDO** | built-in | Databázová abstrakčná vrstva - bezpečnosť |
| **MySQL** | 5.7+ | Relačná databáza (cenovky) |
| **CORS** | - | Cross-Origin Resource Sharing |

### Development & Deployment
| Nástroj | Účel |
|--------|------|
| **Node.js** | Runtime pre React development |
| **npm** | Package manager (npm install, npm start) |
| **create-react-app** | Build tool a dev server |
| **Apache/PHP Server** | Hosting PHP backendu |

---

## Inštrukcie na spustenie

### Požiadavky na Systém

#### Pred spustením nainštalujte:

1. **Node.js a npm** (verzía 14+)
   - Stiahnite z: https://nodejs.org/
   - Overenie: `node --version` a `npm --version`

2. **PHP** (verzía 7.4+)
   - Na Windows: XAMPP/WAMP/LARAGON
   - Na Linux: `sudo apt-get install php php-mysql`
   - Overenie: `php --version`

3. **MySQL** (verzía 5.7+)
   - Zvyčajne súčasť XAMPP/WAMP
   - Overenie: MySQL je spustený na `localhost:3306`

4. **Git** (voliteľne na klonovanie repozitára)

---

### Krok 1: Inštalácia Frontend Závislostí

```bash
# Prejdite do priečinka projektu
cd Web-Project-React

# Nainštalujte npm balíčky
npm install

# Overenie inštalácie
npm list react react-router-dom
```

### Krok 2: Konfigurácia Databázy

#### Vytvorenie MySQL Databázy

```sql
-- Prihlásenie do MySQL
mysql -u root -p

-- Vytvorenie databázy
CREATE DATABASE cenovky;
USE cenovky;

-- Tabuľka Používateľov
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  meno VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  heslo VARCHAR(255) NOT NULL,
  rok_narodenia INT,
  stat VARCHAR(50),
  telefon VARCHAR(20),
  poznamka TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabuľka Produktov
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nazev VARCHAR(200) NOT NULL,
  popis TEXT,
  cena DECIMAL(10, 2),
  sale_price DECIMAL(10, 2),
  kategoria_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabuľka Kategórií
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nazev VARCHAR(100) NOT NULL,
  popis TEXT
);

-- Vzťah medzi produktmi a kategóriami
ALTER TABLE products ADD CONSTRAINT fk_kategoria 
  FOREIGN KEY (kategoria_id) REFERENCES categories(id);
```

#### Konfigurácia Databázového Pripojenia

Upravte súbor `src/backend/db_config.php`:

```php
<?php
// filepath: src/backend/db_config.php

$host = 'localhost';
$dbname = 'cenovky';
$username = 'root';
$password = ''; // Zmeniť ak ste nastavili heslo

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Chyba pripojenia: " . $e->getMessage());
}
?>
```

### Krok 3: Spustenie Backend Servera

#### Možnosť A: Pomocou XAMPP/WAMP

1. **Spustite XAMPP Control Panel**
2. **Kliknite "Start" na Apache a MySQL**
3. **Skopírujte priečinok `src/backend/` do `htdocs/` (XAMPP) alebo `www/` (WAMP)**
4. Backend bude dostupný na: `http://localhost/backend/login.php`

#### Možnosť B: Pomocou PHP Built-in Server

```bash
# Presunite sa do priečinka backendu
cd src/backend

# Spustite PHP server na porte 8000
php -S localhost:8000
```

Overenie backendu:
```bash
curl http://localhost:8000/login.php
```

### Krok 4: Spustenie Frontend Dev Servera

```bash
# V primárnom priečinku projektu
npm start

# Server sa automaticky otvorí na http://localhost:3000
```

### Krok 5: Aktualizácia API Endpoints v Frontend (ak potrebné)

Upravte `src/App.js` alebo príslušné komponenty, ak ste zmenili backend URL:

```javascript
// Zmena z http://localhost/backend na vašu URL
const API_URL = 'http://localhost:8000'; // alebo vaša URL
```

---

### Kontrolný Zoznam Spustenia

- [ ] Node.js a npm nainštalované
- [ ] PHP a MySQL spustené
- [ ] Databáza `cenovky` vytvorená
- [ ] `db_config.php` nakonfigurovaný
- [ ] Backend server beží (`http://localhost/backend` alebo `http://localhost:8000`)
- [ ] Frontend server beží (`http://localhost:3000`)
- [ ] Vyskúšajte login na `http://localhost:3000/login`

---

### Spustenie Pre Produkciu

#### Build Frontend

```bash
npm run build
```

Vytvorí priečinok `build/` s optimalizovanými súbormi.

#### Nasadenie

1. **Frontend (build priečinok):** Nahrajte do web servera (Apache, Nginx)
2. **Backend (src/backend priečinok):** Nahrajte na PHP server
3. **Databáza:** Export/Import SQL skriptu na produkčný server

---

## 📂 Štruktúra projektu

```
Web-Project-React/
├── public/                           # Statické súbory
│   ├── index.html                   # HTML vstup React aplikácie
│   ├── print.html                   # Tlačová stránka
│   ├── manifest.json                # PWA manifest
│   └── pics/                        # Obrázky tímových členov
│
├── src/
│   ├── App.js                       # Hlavný router aplikácie
│   ├── App.css                      # Globálne štýly
│   ├── index.js                     # React entry point
│   ├── index.css                    # Základné štýly
│   │
│   ├── backend/                     # PHP API Endpoints
│   │   ├── db_config.php           # Databázové pripojenie (PDO)
│   │   ├── login.php               # POST /login - Autentifikácia
│   │   ├── register.php            # POST /register - Registrácia
│   │   ├── get_users.php           # GET /get_users - Zoznam používateľov
│   │   ├── get_user_profile.php    # GET /get_user_profile - Profil používateľa
│   │   ├── get_categories.php      # GET /get_categories - Kategórie produktov
│   │   ├── find_products.php       # GET /find_products - Vyhľadávanie
│   │   ├── update_product.php      # POST /update_product - Aktualizácia
│   │   └── delete_my_account.php   # POST /delete_my_account - Vymazanie účtu
│   │
│   └── frontend/                    # React Komponenty
│       ├── components/
│       │   ├── header.jsx          # Navigačný header (všetky stránky)
│       │   ├── footer.jsx          # Päta (všetky stránky)
│       │   ├── login_form.jsx      # Formulár na prihlásenie
│       │   ├── protected_route.jsx # Ochrana trás (PrivateRoute)
│       │   ├── print_content.jsx   # Obsah na tlač
│       │   └── css/                # Štýly komponentov
│       │       ├── login.css
│       │       ├── register.css
│       │       ├── dashboard.css
│       │       ├── zaluby.css
│       │       ├── rozlozenia.css
│       │       └── zmeny.css
│       │
│       ├── dashboard.jsx           # Stránka - Admin panel
│       ├── home_page.jsx           # Stránka - Domov (tím)
│       ├── login_page.jsx          # Stránka - Prihlásenie
│       ├── register_page.jsx       # Stránka - Registrácia
│       ├── profile_page.jsx        # Stránka - Profil používateľa
│       ├── rozlozenie.jsx          # Stránka - Layout demo
│       ├── zaluby_clenov_tymu.jsx  # Stránka - Záľuby tímu
│       ├── zmeny.jsx              # Stránka - Zmeny a dokumentácia
│       └── print_page.jsx          # Stránka - Tlač produktov
│
├── TODO/                            # Staré HTML stránky (Legacy)
│
└── package.json                     # npm konfigurácia a závislosti
```

---

## Frontend Dokumentácia

### 1. **Autentifikačný Systém**

#### Login Stránka (`src/frontend/login_page.jsx`)
- **Účel:** Vstupný bod autentifikácie používateľa
- **Komponenty:** LoginForm
- **Presmerovanie:** Autentifikovaní používatelia → `/dashboard`

#### Login Formulár (`src/frontend/components/login_form.jsx`)
```jsx
// Kľúčové vlastnosti:
- Email a heslo validácia
- Loading state počas odosielania
- Error handling a spätná väzba
- Linky na registráciu
- Disabled submit počas načítavania
```

#### Register Stránka (`src/frontend/register_page.jsx`)
- **Polia:** meno, rok_narodenia, stat, email, heslo, telefon, poznamka
- **Validácia:**
  - Meno: len písmená a medzery (regex: `/^[a-zA-Zá-žÁ-Ž ]+$/`)
  - Email: emailový formát
  - Rok narodenia: číslo
  - Všetky povinné polia
- **Akcia:** Automatické presmerovanie na login po úspešnej registrácii

#### Protected Route (`src/frontend/components/protected_route.jsx`)
- Ochrana stránok (len autentifikovaní používatelia)
- Kontrola localStorage na user session
- Presmerovanie na login ak bez autentifikácie

---

### 2. **Hlavné Stránky Aplikácie**

#### Dashboard (`src/frontend/dashboard.jsx`)
**Účel:** Admin panel pre správu používateľov a produktov

**Vlastnosti:**
- **Tabuľka Používateľov:**
  - Zobrazenie všetkých registrovaných používateľov
  - Filter podľa: meno, stat, email, rok_narodenia, telefon, poznamka
  - Sortovanie: ID, meno, rok narodenia, stat, email, telefon
  - Sort indikátory (↑↓) v stĺpcoch
  - Počítadlo používateľov
  
- **State Management:**
  ```javascript
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterType, setFilterType] = useState('meno');
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  ```

- **API Integration:** `GET /backend/get_users.php`

#### Home Page (`src/frontend/home_page.jsx`)
- Profily tímových členov s fotkami
- Tímové členy:
  - Denis Ondruška
  - Dávid Krochliak
  - Matúš Tokarčík
  - Richard Valenta
  - Ukrajinec (ChatGPT Asistent)

#### Profile Page (`src/frontend/profile_page.jsx`)
**Účel:** Správa profilu používateľa a vymazanie účtu

**Vlastnosti:**
- Zobrazenie: meno, email, rok_narodenia, stat, telefon, poznamka
- **Sekcia Vymazania Účtu:**
  - Potvrdenie (napísať "POTVRDZOVAŤ")
  - API Call: `POST /backend/delete_my_account.php`
  - Vymazanie localStorage a presmerovanie na login
  - Správy o úspechu/chybe

#### Rozloženie (`src/frontend/rozlozenie.jsx`)
**Účel:** Demonštrácia responzívneho CSS Grid a Flexbox layoutu

**Vlastnosti:**
- Karty tímových členov
- Responzívny grid:
  - Mobile First: 1 stĺpec do 768px
  - Tablet: 2 stĺpce (768px - 1200px)
  - Desktop: 3 stĺpce nad 1200px

#### Záľuby Členov Tímu (`src/frontend/zaluby_clenov_tymu.jsx`)
**Účel:** Zobrazenie záľub s Font Awesome ikonami

**Záľuby Tímu:**
- **Denis Ondruška:** Motorky, autá, programovanie, socializácia, hry
- **Dávid Krochliak:** Posilňovňa, varenie, networking, socializácia, hry
- **Matúš Tokarčík:** Motorky, beh, futbal, socializácia, hry
- **Richard Valenta:** Posilňovňa, cestovanie, socializácia, hry

#### Zmeny (`src/frontend/zmeny.jsx`)
**Účel:** Dokumentácia zmien a vylepšení projektu

**Sekcie:**
1. Prehľad zmien
2. Technické rozhodnutia (CSS premenné, REM jednotky)
3. Implementované funkcionality
4. UX/UI rozhodnutia (dark mode, prístupnosť)
5. Prístupnostné vylepšenia (ARIA labels, farebný kontrast)
6. Architektúra projektu

#### Print Page (`src/frontend/print_page.jsx`)
- Dedikovaná stránka pre tlač produktov
- Vrátane header, print content a footer

---

### 3. **Komponenty**

#### Header (`src/frontend/components/header.jsx`)
- Navigačný bar so správou používateľa
- Logout funkčnosť
- Linky na hlavné stránky:
  - Dashboard
  - Domov
  - Rozloženie
  - Záľuby
  - Zmeny
  - Profil
- Dark mode toggle (voliteľne)

#### Footer (`src/frontend/components/footer.jsx`)
- O aplikácii sekcia
- Rýchle linky na stránky
- Sociálne médiá
- Copyright informácie

---

## Backend Dokumentácia

### Databázová Konfigurácia

#### `src/backend/db_config.php`
```php
<?php
// PDO connection setup
$host = 'localhost';
$dbname = 'cenovky';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Chyba: " . $e->getMessage());
}
?>
```

---

### Autentifikačné Endpoints

#### `login.php` - Prihlásenie

**Metóda:** `POST`

**Request Body:**
```json
{
  "email": "pouzivatel@example.com",
  "password": "heslo123"
}
```

**Response (Úspech):**
```json
{
  "id": 1,
  "meno": "Ján Novák",
  "email": "pouzivatel@example.com",
  "rok_narodenia": 2000,
  "stat": "Slovensko"
}
```

**Response (Chyba):**
```json
{
  "error": "Nesprávne prihlasovacie údaje"
}
```

---

#### `register.php` - Registrácia

**Metóda:** `POST`

**Request Body:**
```json
{
  "meno": "Ján Novák",
  "rok_narodenia": 2000,
  "stat": "Slovensko",
  "email": "pouzivatel@example.com",
  "password": "heslo123",
  "telefon": "+421123456789",
  "poznamka": "Voliteľné poznámky"
}
```

**Validácia:**
- ✓ Meno: len písmená a medzery
- ✓ Email: planý email formát
- ✓ Rok narodenia: číslo
- ✓ Všetky povinné polia

**Response (Úspech):**
```json
{
  "success": "Registrácia úspešná"
}
```

**Response (Chyba):**
```json
{
  "error": "Email už existuje"
}
```

---

### Správa Používateľov

#### `get_users.php` - Zoznam Používateľov

**Metóda:** `GET`

**Query Parametre:**
- `filterType` (voliteľné): meno, stat, email, rok_narodenia, telefon, poznamka
- `filterValue` (voliteľné): hodnota na filtrovanie
- `sortBy` (voliteľné): stĺpec na sortovanie
- `sortOrder` (voliteľné): asc alebo desc

**Príklad URL:**
```
GET /get_users.php?filterType=stat&filterValue=Slovensko&sortBy=meno&sortOrder=asc
```

**Response:**
```json
[
  {
    "id": 1,
    "meno": "Denis Ondruška",
    "rok_narodenia": 2000,
    "stat": "Slovensko",
    "email": "denis@example.com",
    "telefon": "+421123456789",
    "poznamka": "Poznámky tu"
  },
  {
    "id": 2,
    "meno": "Dávid Krochliak",
    "rok_narodenia": 2001,
    "stat": "Slovensko",
    "email": "david@example.com",
    "telefon": "+421987654321",
    "poznamka": "Ďalšie poznámky"
  }
]
```

---

#### `get_user_profile.php` - Profil Používateľa

**Metóda:** `GET`

**Query Parametre:**
- `id`: ID používateľa

**Response:**
```json
{
  "id": 1,
  "meno": "Denis Ondruška",
  "email": "denis@example.com",
  "rok_narodenia": 2000,
  "stat": "Slovensko",
  "telefon": "+421123456789",
  "poznamka": "Poznámky"
}
```

**Vlastnosti:**
- ✓ XSS ochrana na výstupe
- ✓ Vrátenie bez hesla (bezpečnosť)

---

#### `delete_my_account.php` - Vymazanie Účtu

**Metóda:** `POST`

**Request Body:**
```json
{
  "id": 1
}
```

**Response (Úspech):**
```json
{
  "success": "Účet bol vymazaný"
}
```

**Response (Chyba):**
```json
{
  "error": "Chyba pri vymazaní účtu"
}
```

---

### Správa Produktov

#### `get_categories.php` - Kategórie

- **Metóda:** GET
- **Účel:** Načítanie všetkých kategórií produktov
- **Response:** Pole kategórií

---

#### `find_products.php` - Vyhľadávanie Produktov

**Metóda:** `GET`

**Query Parametre:**
- `q`: Hľadaný termín

**Príklad URL:**
```
GET /find_products.php?q=iPhone
```

**Response:**
```json
[
  {
    "id": 1,
    "nazev": "iPhone 14",
    "popis": "Najnovší iPhone model",
    "cena": 999.99,
    "sale_price": 899.99,
    "kategoria": "Telefóny",
    "created_at": "2024-01-01",
    "updated_at": "2024-01-02"
  }
]
```

**Vlastnosti:**
- ✓ Vyhľadávanie podľa názvu a popisu (LIKE operator)
- ✓ Vrátenie formatovaných výsledkov

---

#### `update_product.php` - Aktualizácia Produktu

**Metóda:** `POST`

**Request Body:**
```json
{
  "id": 1,
  "nazev": "iPhone 14 Pro",
  "popis": "Aktualizovaný popis",
  "cena": 1099.99,
  "sale_price": 999.99
}
```

**Response:**
```json
{
  "success": "Produkt aktualizovaný"
}
```

---

## CSS & Styling

### Systém Dizajnu

#### CSS Premenné (v globálnych štýloch)
```css
:root {
  --color-background: #ffffff;
  --color-foreground: #000000;
  --color-accent: #007bff;
  --border-style: 1px solid #ddd;
  --font-weight-bold: 600;
  --font-family-mono: 'Courier New', monospace;
  --transition-speed: 0.3s;
}
```

#### Responzívne Breakpointy

```css
/* Mobile First Approach */
550px and down      /* Malé telefóny */
768px              /* Tablety */
1200px             /* Stolné počítače */
1400px+            /* Veľké monitory */
```

### Kľúčové CSS Súbory

| Súbor | Účel |
|-------|------|
| `login.css` | Centrovaný login formulár, input štýly, button stavy |
| `register.css` | Layout formulára, správy, GDPR info |
| `dashboard.css` | Tabuľka štýly, filter sekcia, sort indikátory |
| `zaluby.css` | Card layout, flexbox, ikony s farbami |
| `rozlozenia.css` | CSS Grid, team cards, dark mode |
| `zmeny.css` | Dokumentácia štýly, code bloky |

---

## Bezpečnosť

### Implementované Bezpečnostné Opatrenia

1. **CORS Headers** - Všetky PHP endpoints majú CORS headers
   ```php
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   ```

2. **XSS Ochrana** - Escape údajov pred zobrazením
   ```php
   htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
   ```

3. **SQL Injection Ochrana** - PDO Prepared Statements
   ```php
   $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
   $stmt->execute([$email]);
   ```

4. **Heslo Zabezpečenie** - Validácia a hashing
   - Password validation (minimálna dĺžka, zložitosť)
   - Pravdepodobný hash (password_hash)

5. **Input Validácia** - Server-side validácia
   - Email format
   - Meno (len písmená)
   - Roku prirodzené číslo

6. **Session Management** - localStorage s ochranou
   - Kontrola autentifikácie na frontend
   - Protected Routes

7. **Error Handling** - Bezpečné chybové správy
   - Nezverejňovanie citlivých informácií

---

## API Response Vzory

### Úspešná Odpoveď
```json
{
  "success": "Operácia úspešná"
}
```

### Chybová Odpoveď
```json
{
  "error": "Popis chyby"
}
```

---

## Autentifikačný Tok

```
1. User navštívi /login
2. Zadá email a heslo
3. Frontend POST na login.php
4. Backend validácia údajov
5. MySQL query na verifikáciu
6. Vrátenie user objektu
7. Frontend uloží do localStorage
8. Presmerovanie na /dashboard
9. ProtectedRoute kontroluje localStorage
10. Prístup buď povolený alebo presmerovanie na /login
```

---

## Prístupnosť

### Implementované Features

- ✓ **ARIA Labels** - Navigačné prvky
- ✓ **Semantic HTML** - `<header>`, `<main>`, `<footer>`
- ✓ **Color Contrast** - Dark/light mode podpora
- ✓ **REM Units** - Responzívna typografia
- ✓ **Keyboard Navigation** - Podpora klávesnice
- ✓ **Dark Mode Toggle** - User preference

---

## Zhrnutie Kľúčových Vlastností

✅ Autentifikácia (login/register)  
✅ Správa profilu používateľa  
✅ Admin dashboard s filtrovaním a sortovaním  
✅ Vyhľadávanie produktov  
✅ Responzívny dizajn (mobile-first)  
✅ Dark/light mode podpora  
✅ Vymazanie účtu s potvrdením  
✅ Tlačová funkčnosť  
✅ Tímové informačné stránky  
✅ Komplexná dokumentácia  
✅ CORS-enabled API endpoints  
✅ XSS ochrana  
✅ SQL Injection ochrana  
✅ PDO databázové pripojenie  

---

## Status Projektu

**Stav:** Aktívny vývoj  
**Verzia:** 1.0.0  
**Posledná Aktualizácia:** December 2025

Projekt obsahuje kompletný autentifikačný systém, správu používateľov, správu produktov a komplexnú dokumentáciu.

---

## Kontakt & Support

Projekt bol vyvinutý študentami TUKE:
- Denis Ondruška
- Dávid Krochliak
- Matúš Tokarčík
- Richard Valenta

---

**Koniec Dokumentácie**