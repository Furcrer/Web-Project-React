import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import './components/css/zmeny.css';

const Zmeny = () => {
    return (
        <>
            <Header />
            <main>
                <section id="sekcia_zmena" className="changes-section">
                    <div className="container">
                        <h1>Zmeny v projekte</h1>

                        <article className="change-group">
                            <h2>Prehľad vykonaných zmien</h2>
                            <p>
                                Počas vývoja webovej stránky sme implementovali viaceré vylepšenia s cieľom zlepšiť
                                vizuálnu konzistenciu, prehľadnosť a celkovú používateľskú skúsenosť. 
                                Boli pridané nové komponenty, ako napríklad responzívna navigačná lišta s prepínačom 
                                <strong>Dark Mode</strong> a dynamické prispôsobenie veľkosti písma pomocou jednotiek <code>rem</code>. 
                                Okrem toho sme optimalizovali štruktúru HTML pre lepšiu čitateľnosť a správne použitie 
                                sémantických prvkov ako <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code> a <code>&lt;footer&gt;</code>.
                            </p>
                        </article>

                        <article className="change-group">
                            <h2>Technické rozhodnutia a implementácia</h2>
                            
                            <div className="technical-points">
                                <div className="tech-item">
                                    <h3>CSS Premenné a Design System</h3>
                                    <p>Vytvorili sme centralizovaný systém premenných v <code>:root</code> pre konzistentné farby, typografiu a rozmiery. Toto umožnilo jednoduchú implementáciu dark/light módu a responzívneho dizajnu.</p>
                                </div>
                                
                                <div className="tech-item">
                                    <h3>Flexbox Layout Systém</h3>
                                    <p>Použili sme Flexbox pre responzívne rozloženie prvkov, čo umožnilo plynulé prispôsobovanie sa rôznym veľkostiam obrazovky a jednoduché centrovanie obsah.</p>
                                </div>
                                
                                <div className="tech-item">
                                    <h3>REM Jednotky namiesto PX</h3>
                                    <p>Implementovali sme REM jednotky pre lepšiu škálovateľnosť a prístupnosť. Toto respektuje používateľské nastavenia písma a umožňuje konzistentné proporcie v celom rozhraní.</p>
                                </div>
                            </div>
                        </article>

                        <article className="change-group">
                            <h2>Implementované funkcionality</h2>
                            
                            <div className="functionality-grid">
                                <div className="func-item">
                                    <h3>1. Výpis údajov (User List Page)</h3>
                                    <ul>
                                        <li>Podstránka "VÝPIS REGISTROVANÝCH POUŽÍVATEĽOV"</li>
                                        <li>Filtrovanie podľa: meno, štát, email, rok narodenia</li>
                                        <li>Zoradenie podľa jednotlivých stĺpcov</li>
                                        <li>Display všetkých registrovaných používateľov z databázy</li>
                                    </ul>
                                </div>
                                
                                <div className="func-item">
                                    <h3>2. Mazanie (Delete Function)</h3>
                                    <ul>
                                        <li>Delete funkcionalita pre "nepotrebné" alebo "dokončené" záznamy</li>
                                        <li>Delete button alebo checkbox systém</li>
                                        <li>Backend delete endpoint</li>
                                    </ul>
                                </div>
                                
                                <div className="func-item">
                                    <h3>3. Dynamické prvky (Dynamic Elements)</h3>
                                    <ul>
                                        <li>Filtering komponent pre user list</li>
                                        <li>Sorting tlačidlá pre stĺpce</li>
                                        <li>Delete výberový systém</li>
                                    </ul>
                                </div>
                                
                                <div className="func-item">
                                    <h3>4. Responzívny dizajn (Responsive Design)</h3>
                                    <ul>
                                        <li>CSS media queries pre tablet/mobile</li>
                                        <li>Responzívne layout úpravy</li>
                                        <li>Mobile-first prístup</li>
                                    </ul>
                                </div>
                                
                                <div className="func-item">
                                    <h3>5. XSS ochrana (XSS Protection)</h3>
                                    <ul>
                                        <li>Explicitná XSS ochrana pri zobrazovaní user dát</li>
                                        <li>HTML escaping v frontende</li>
                                        <li>Bezpečná manipulácia s používateľskými vstupmi</li>
                                    </ul>
                                </div>
                                
                                <div className="func-item">
                                    <h3>6. Dokumentácia (Documentation)</h3>
                                    <ul>
                                        <li>Architektúra projektu</li>
                                        <li>Inštalačné inštrukcie</li>
                                        <li>Zoznam použitých technológií</li>
                                        <li>Popis testovania</li>
                                    </ul>
                                </div>
                                
                                <div className="func-item">
                                    <h3>7. Organizácia (Organization)</h3>
                                    <ul>
                                        <li>/frontend štruktúra priečinkov</li>
                                        <li>/backend štruktúra priečinkov</li>
                                        <li>Oddelenie logických jednotiek</li>
                                        <li>Konsistentná štruktúra projektu</li>
                                    </ul>
                                </div>
                            </div>
                        </article>

                        <article className="change-group">
                            <h2>UX/UI rozhodnutia</h2>
                            <p>
                                Naším cieľom bolo vytvoriť dizajn, ktorý je jednoduchý, moderný a zároveň prístupný 
                                pre rôzne typy zariadení. Používateľ si môže prepínať medzi svetlým a tmavým režimom 
                                podľa svojich preferencií, pričom toto nastavenie sa ukladá pomocou <code>localStorage</code>.
                                Text a obsah sa prispôsobujú rôznym veľkostiam obrazovky a jednotky <code>rem</code> umožňujú 
                                dynamické zmeny veľkosti písma bez narušenia layoutu.
                            </p>
                        </article>

                        <article className="change-group">
                            <h2>Zmeny pre prístupnosť (Accessibility)</h2>
                            <p>
                                V rámci prístupnosti sme pridali atribúty <code>aria-label</code> pre kľúčové navigačné prvky 
                                (napr. logo, prepínač témy, navigačné menu). Tieto prvky uľahčujú orientáciu používateľom, 
                                ktorí využívajú čítačky obrazovky. Dôraz bol kladený aj na dostatočný kontrast farieb 
                                medzi textom a pozadím, čo zlepšuje čitateľnosť pri použití tmavého aj svetlého režimu. 
                                Okrem toho boli implementované responzívne prvky a správne poradie hierarchie nadpisov 
                                pre jednoduchšiu navigáciu klávesnicou.
                            </p>
                        </article>

                        <article className="change-group">
                            <h2>Externé JavaScript súbory</h2>
                            <p>
                                JavaScript bol použitý ako <strong>externý skript</strong> na riadenie prepínača Dark Mode a 
                                mobilného menu. Kód je oddelený od HTML pre lepšiu údržbu a čitateľnosť. 
                                Implementácia využíva udalosti <code>DOMContentLoaded</code> a <code>addEventListener()</code> 
                                na dynamické správanie stránky bez nutnosti znovunačítania.
                            </p>
                        </article>

                        <article className="change-group">
                            <h2>Architektúra projektu</h2>
                            <div className="architecture">
                                <h3>Frontend štruktúra:</h3>
                                <pre>
{`frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── css/
│   │       ├── header.css
│   │       ├── footer.css
│   │       └── zaluby.css
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── Zaluby.jsx
│   │   ├── Zmeny.jsx
│   │   ├── Rozlozenie.jsx
│   │   └── Dashboard.jsx
│   └── App.js`}
                                </pre>
                                
                                <h3>Backend štruktúra:</h3>
                                <pre>
{`backend/
├── api/
│   ├── get_users.php
│   ├── delete_user.php
│   └── find_products.php
├── config/
│   └── database.php
└── index.php`}
                                </pre>
                            </div>
                        </article>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Zmeny;