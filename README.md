# ResearchProject

## Installatiehandleiding

### OpenAI secret key ophalen

1. Ga naar https://platform.openai.com/docs/overview
2. Maak een account aan of log in.
3. Klik helemaal links op het icoontje van het slotje, genaamd "API Keys".
4. Klik op “Create new secret key”.
5. Als je wilt, kun je de secret key een naam geven maar hoeft niet noodzakelijk. Klik daarna op "create secret key".
6. Het is **belangrijk** dat je nu op "copy" klikt en je secret key ergens opslaat. Zodra je op "done" klikt, is het niet meer mogelijk om toegang te krijgen tot de key.

### Installatie van het project

1. Clone de GitHub-repository en open deze in een code-editor.
2. Open een terminal en zorg ervoor dat je je bevindt in de ResearchProject-map.
3. Installeer alle benodigde pakketten:
    
    ```powershell
    npm i
    ```
    
4. Maak een .env-bestand aan in de hoofdmap.
5. Plaats je geheime API-sleutel in het bestand:
    
    ```powershell
    VITE_API_KEY=[secretApiKey]
    ```
    
6. Voer het project uit.
