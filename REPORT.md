# 📌 Rättningsrapport – fed24s-the-last-todo-MijaMange

## 🎯 Uppgiftens Krav:
﻿# Hiking Checklist - Todo App

Detta är en React-baserad todo-applikation där syftet är att bygga en enkel men funktionell lista där man kan planera vad som ska med på en vandring.

## Funktioner

- Förifylld lista med uppgifter inför en vandring
- Möjlighet att lägga till egna uppgifter
- Markera uppgifter som klara eller ångra dem
- Drag and drop-funktion för att ändra ordningen
- Sortering A–Ö eller Ö–A
- Uppgifterna sparas i webbläsarens localStorage
- Knapp för att markera alla som klara eller ångra alla
- Export-/utskriftsknapp
- Egen design med bild, färgtema, font och logotyp

## Teknik

- React med TypeScript
- Komponentbaserad struktur
- @hello-pangea/dnd för drag and drop
- LocalStorage för lagring
- Egenskriven CSS med flexbox (ingen extern UI-ram)

## Projektsetup

```bash
npm install
npm run dev
```


## 🔍 ESLint-varningar:


## 🏆 **Betyg: VG**
📌 **Motivering:** Koden uppfyller alla krav och går utöver grundläggande funktioner, är välstrukturerad, modulär, och har bra användning av React och TypeScript. Inga större felhandlingar eller prestandaflaskhalsar identifierades. Drag and drop-funktionaliteten implementeras korrekt och användarupplevelsen är intuitiv och välgenomtänkt. CSS-designen med egna stilar är branding-fokuserad och API för localStorage används effektivt.

💡 **Förbättringsförslag:**  
Inga större förbättringar behövs, men följande små förbättringar kan övervägas för att förfina koden ytterligare: 
1. Reducera användningen av inline-stilar och istället konsolidera dessa i CSS-filen för mer konsekvens i design stil.
2. Förbättra error-trap för localStorage genom att specificera mer detaljerade felmeddelanden istället för att använda ett generiskt felmeddelande.
3. Optimera rendering genom att använda React.memo för komponenter som ofta åter-renderas utan ändringar.