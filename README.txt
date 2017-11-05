Prima di mandare in esecuzione ServiceApi, bisogna avviare il server di Mongodb.

***.AVVIO SERVER MONGODB.***
1. Copia il path della cartella bin (Es. C:\Program Files\MongoDB\Server\3.4\bin)
2. Vai su Pannello di Controllo->Sistema e Sicurezza-> Sistema-->impostazioni di sistema avanzate
   clicca su variabili d'ambiente, seleziona tra le variabili di sistema 'Path' e modifica questa
   aggiungendo il path copiato.
3. Apri un prompt dei comandi e digita:
   mongod --dbpath path_database
   path_database deve essere il path della directory contenente il database

***.AVVIO PROGETTO SERVICE API.***
1. Apri il progetto serviceAPI.sln
2. Avvia l'applicazione

***.AVVIO PROGETTO GESTIONE MATERIE.***
1. Apri il progetto gestione_materie.sln
2. Avvia l'applicazione
3. All'avvio apparirà una form di login: per utilizzare l'applicazione, inserisci una delle seguenti coppie email/password:

ELENCO DOCENTI:

1. Email: "giuseppe.ascia@dieei.unict.it"	Password: "CoRtExArM"	
2. Email: "antonella.distefano@dieei.unict.it"	Password: "CloudComputing"
3. Email: "vincenza.carchiolo@dieei.unict.it"	Password: "ScalaGoSwiftR"
4. Email: "michele.malgeri@dieei.unict.it"	Password: "AllIsSecurity"
5. Email: "lucia.lobello@dieei.unict.it"	Password: "ReAlTiMeSYSTEMS"
6. Email: "giacomo.morabito@dieei.unict.it	Password: "TELEcomunicazioni"

Il progetto prevede:
1. La possibilità di visualizzare tutti gli studenti iscritti all'università.
2. La possibilità di visualizzare tutti i corsi tenuti dal docente.
3. La possibilità di visualizzare tutti gli appelli relativi a un corso e gli studenti prenotati ad esso.
4. La possibilità di effettuare la registrazione della materia per uno studente regolarmente prenotato.
5. La possibilità di visualizzare la carriera universitaria di tutti gli studenti iscritti.
6. La possibilità di eliminare un corso tenuto dal docente.
Giuseppa Reitano - 055000314
Giuseppe Pennisi - 055000338 