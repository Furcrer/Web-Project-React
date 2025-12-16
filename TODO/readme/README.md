# optimisation/

Tento priečinok obsahuje:
- **wireframey** (textové náčrty) pre 4 šírky,
- **popis správania prvkov** pri rôznych rozlíšeniach,
- **stručnú analýzu použiteľnosti (UX/UI)** a prístupnosti.

---

## Wireframe – 550 px (malé mobily)

- Hlavička (logo + tlačidlo Menu)
- Navigácia skrytá za tlačidlom
- Jednostĺpcová mriežka kariet záľub
- Footer

---

## Wireframe – 850 px (väčšie mobily / menšie tablety)

- Hlavička (logo + horizontálne menu – ak je miesto)
- Mriežka 2 stĺpce
- Stránka „Rozloženie“ ešte stále vertikálna

---

## Wireframe – 1250 px (notebooky)

- Horizontálne menu
- Mriežka 3–4 stĺpce
- Stránka „Rozloženie“: Grid 3 stĺpce (sidebar | content | aside)

---

## Wireframe – 1400 px+ (veľké monitory)

- Max. šírka wrapperu
- Využitie voľného priestoru
- Mriežka 4+ stĺpcov

---

## Správanie prvkov

### Navigácia
- Na mobiloch skrytá → ovládaná tlačidlom
- Na desktopoch stále viditeľná

### Karty záľub
- Menia počet stĺpcov podľa šírky
- Obrázky s `object-fit: cover`

### Stránka Rozloženie
- CSS Grid používa `grid-template-areas`
- Na mobiloch sa oblasti skladajú pod seba
- Na väčších obrazovkách sú v riadku

### Sekcia „sekcia_zmena“
- Ovládanie veľkosti obsahu:
  - klik tlačidlá
  - klávesové skratky
  - výber z menu
  - automaticky pri zmene šírky

---

## Stručná analýza použiteľnosti (UX/UI)

- **Zvýšený kontrast** → lepšia čitateľnosť (WCAG)
- **Väčšie klikacie plochy**
- **Konzistentná typografia**
- Ovládanie klávesnicou → rýchlejšie používanie
- Automatické načítanie vhodného CSS → lepší výkon

---

> Projekt spĺňa všetky zadania školského projektu:
- 3 podstránky
- Responzivita (550 / 850 / 1250 / 1400+)
- Flexbox + CSS Grid
- Dynamické načítanie CSS podľa šírky
- Sekcia `sekcia_zmena` s ovládaním textu 3 spôsobmi
- UX/UI + prístupnosť + dokumentácia
