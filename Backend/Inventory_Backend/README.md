# Nodejs - Express-demo

# Ohjeet/komennot uuden sovelluksen alustamiseen:
Luo projektille oma kansio ja navigoi komentorivillä sinne

# Alustus 
npm init
Määrittele package.json syöttämällä pyydetyt arvot tai painamalla jokaisen kohdalla Enter

# Asenna express
npm install express

# Asenna tuki tyypeille
npm install -D @types/express @types/node ts-node-dev ts-node

# Hot reload/automaattinen uudelleenkäynnistys
Lisää package.json-tiedoston "scripts"-olioon uusi ominaisuus "start": "ts-node-dev --respawn index.ts"

-----------------------------------------------------------------------------------------------------------
# Projektin käynnistäminen (esim. ladattaessa esimerkkikoodit githubista)
Navigoi projektikansion juureen
npm install
luo -env-tiedosto sovelluksen juureen ja lisää sinne 'PORTTI=3005'
npm run start