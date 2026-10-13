// Listino 2026 di Agenzia Impresa (listino2026.pdf), con prezzi, indicizzato per slug d'area (vedi areas.js).
// Voce singola: { title, note?, price }. Sotto-area con più servizi: { title, note?, items: [{ name, price }] }.
// Correzioni come sul sito Agenzia Impresa: "Legal Entity Identifier", "dal cliente", "outsourcing".

const URGENZA = { title: 'Diritto d’urgenza', note: 'A partire dai 2 giorni al giorno di scadenza', price: 'Da € 20 a € 50*' }
const ASSISTENZA = {
  title: 'Assistenza e approfondimenti sui quesiti specifici inerenti gli aspetti normativi e procedurali',
  note: 'Verifica presso gli enti delle corrette procedure, verifiche soggettive, verifica requisito professionale, verifica di fattibilità allo svolgimento dell’attività d’impresa ecc.',
  price: '€ 80/ora*',
}
const SCIA = (conIstruttoria, dalCliente) => [
  { name: 'Presentazione SCIA per inizio, variazione attività con predisposizione ed istruttoria pratica', price: conIstruttoria },
  { name: 'Presentazione SCIA per inizio, variazione attività – modulistica predisposta dal cliente', price: dalCliente },
]
const CESSAZIONE = { name: 'Comunicazione di cessazione', price: '€ 150*' }

export const NOTE_LISTINO = [
  'Le tariffe indicate non comprendono IVA e costi effettivi per valori bollati, marche, diritti di segreteria, etc.',
  'Sono previsti sconti, ad eccezione delle tariffe riportanti il contrassegno asterisco (*).',
]

export const listino = {
  'registro-imprese-comunica': [
    {
      title: 'Deposito Atti Registro Imprese',
      note: 'Comprensivo di istruttoria compilazione e deposito (Costituzioni, Modifiche Statutarie, Cariche Sociali, Poteri organo amministrativo, Fusioni, Scissioni, Cessioni Azienda, Conferimenti Azienda, Cessioni Quote/Trasferimenti Mortis Causa, Liquidazioni-scioglimenti-cancellazioni, Bilancio Finale di Liquidazione, Procedure Concorsuali, Start Up - PMI Innovative, Cessione Crediti)',
      price: '€ 140',
    },
    {
      title: 'Deposito Comunicazioni Registro Imprese',
      note: 'Comprensivo di istruttoria compilazione e deposito (Modifica dati anagrafici, Comunicazione PEC, Versamento Capitale, Socio Unico - Pluralità dei Soci, Titolare Effettivo, Direzione e Coordinamento, Depositi a Rettifica Atti, Cambio Sede)',
      price: '€ 98',
    },
    {
      title: 'Deposito Denunce REA per attività non Regolate',
      note: 'Comprensivo di istruttoria compilazione e deposito (Iscrizione Ditte Individuali con Inizio attività - Variazione Attività, Apertura - Variazione UL, Albo Artigiani sia per Società che per Ditte individuali)',
      price: '€ 130',
    },
    {
      title: 'Deposito Denunce REA per attività Regolate',
      note: 'Comprensivo di istruttoria compilazione e deposito dell’apposita SCIA Camerale (Iscrizione Ditte Individuali con Inizio attività - Variazione Attività, Apertura - Variazione UL, Variazione Responsabile Tecnico, Albo Artigiani sia per Società che per Ditte Individuali)',
      price: '€ 160',
    },
    {
      title: 'Deposito Comunicazioni REA',
      note: 'Comprensivo di istruttoria compilazione e deposito (Iscrizione Ditte Individuali inattive, Cancellazioni di ditte individuali, Cessazione Attività, Cessazione UL Società e Ditte Individuali, Modifiche di ditte individuali, Iscrizione - Variazione - Cessazione Collaboratori Familiari per le Ditte Individuali)',
      price: '€ 98',
    },
    { title: 'Deposito Comunicazione anagrafiche dati IVA', note: 'AdE comunica', price: '€ 65' },
    { title: 'Deposito Comunicazione anagrafiche dati INPS', note: 'INPS comunica', price: '€ 59' },
    { title: 'Deposito Comunicazione anagrafiche dati INAIL', note: 'INAIL comunica', price: '€ 59' },
    { title: 'Deposito Bilancio', note: 'Micro - Abbreviato - Ordinario - Consolidato', price: '€ 115' },
    {
      title: 'Trasformazione file in XBRL',
      items: [
        { name: 'Per abbreviato - ordinario - consolidato', price: '€ 200*' },
        { name: 'Per micro-imprese', price: '€ 80*' },
      ],
    },
    {
      title: 'Compilazione Elenco Soci',
      items: [
        { name: 'Fino a 10 soci', price: '€ 60*' },
        { name: 'Oltre 10 soci', price: 'Da concordare' },
      ],
    },
    {
      title: 'Codice LEI – Legal Entity Identifier',
      note: 'Richiesta – Rinnovo con attestato – Ripristino – Trasferimento',
      price: '€ 155*',
    },
    {
      title: 'Comunica',
      items: [
        { name: 'Registro Imprese', price: 'Da € 98 a € 160' },
        { name: 'SUAP', price: 'Da € 150 a € 450' },
        { name: 'INPS', price: '€ 59' },
        { name: 'Agenzia Entrate', price: '€ 65' },
        { name: 'INAIL', price: '€ 59' },
      ],
    },
    ASSISTENZA,
    URGENZA,
  ],

  'pratiche-suap': [
    { title: 'Attività di vendita (vicinato, commercio elettronico, commercio ingrosso)', items: [...SCIA('€ 250*', '€ 150*'), CESSAZIONE] },
    { title: 'Attività artigianali/produttive', items: [...SCIA('€ 450*', '€ 180*'), CESSAZIONE] },
    { title: 'Attività di intrattenimento', items: [...SCIA('€ 450*', '€ 180*'), CESSAZIONE] },
    { title: 'Attività di vendita (medie e grandi strutture)', items: [...SCIA('Da concordare', 'Da concordare'), CESSAZIONE] },
    { title: 'Attività ricettive (alberghi, ostelli)', items: [...SCIA('Da concordare', 'Da concordare'), CESSAZIONE] },
    {
      title: 'Attività ricettive (casa vacanze, affitta camere, Airbnb)',
      items: [
        ...SCIA('€ 250*', '€ 150*'),
        { name: 'Presentazione SCIA per inizio, variazione attività per alberghi con predisposizione ed istruttoria pratica', price: 'Da concordare' },
        CESSAZIONE,
      ],
    },
    { title: 'Somministrazione alimenti e bevande', items: [...SCIA('€ 450*', '€ 180*'), CESSAZIONE] },
    { title: 'Altre attività – EX PS (Agenzia d’affari)', items: [...SCIA('€ 250*', '€ 150*'), CESSAZIONE] },
    {
      title: 'Altre autorizzazioni COMUNALI - SCIA',
      items: [
        { name: 'SCIA pratica occupazione suolo pubblico', price: 'Da concordare' },
        { name: 'SCIA pratica insegne', price: '€ 150*' },
      ],
    },
    {
      title: 'Altre Prestazioni Professionali',
      items: [
        { name: 'Tecnico impatto acustico', price: 'Da concordare' },
        { name: 'Tecnico piantina', price: 'Da concordare' },
      ],
    },
    {
      title: 'Carta esercizio ambulanti',
      items: [
        { name: 'Rilascio / Variazione', price: '€ 140' },
        { name: 'Attestazione annuale / Revoca', price: '€ 100' },
      ],
    },
    ASSISTENZA,
    URGENZA,
  ],

  marchi: [
    { title: 'Assistenza Registrazione Marchi', price: '€ 500*' },
    { title: 'Verifica preventiva dell’esistenza di registrazione di Brand seguita da registrazione', price: '€ 50*' },
  ],

  'agenzia-entrate-adm': [
    {
      title: 'Successioni',
      items: [
        { name: 'Predisposizione dichiarazioni di successione', price: 'Da concordare' },
        { name: 'Deposito telematico della dichiarazione di successione', price: '€ 150*' },
        { name: 'Richiesta di copie e certificati presso Ufficio Successioni', price: '€ 43*' },
      ],
    },
    {
      title: 'Ufficio del Registro',
      items: [
        { name: 'Registrazione atti - Privati, Pubblici (presso sportello)', price: '€ 63*' },
        { name: 'Registrazione Contratti locazione / comodato (presso sportello)', price: '€ 63*' },
        { name: 'Registrazione Contratti locazione / comodato (telematico)', price: '€ 79' },
        { name: 'Pagamento imposta telematica delle annualità successive, proroghe, risoluzioni per i contratti di locazione', price: '€ 48' },
        { name: 'Registrazione Preliminare di compravendita Immobiliare (presso sportello)', price: '€ 63*' },
        { name: 'Registrazione Preliminare di compravendita Immobiliare (telematico)', price: '€ 79' },
      ],
    },
    { title: 'IVA', items: [{ name: 'Inizio, variazioni, chiusure P.IVA', price: '€ 79' }] },
    {
      title: 'ADM',
      items: [
        { name: 'Comunicazioni Intrastat Acquisti (modelli precompilati dal cliente fino a 5 righe di dettaglio)', price: '€ 65*' },
        { name: 'Comunicazioni Intrastat Vendite (modelli precompilati dal cliente fino a 5 righe di dettaglio)', price: '€ 65*' },
        { name: 'Comunicazioni Intrastat Acquisti (solo invio predisposto dal cliente)', price: '€ 35*' },
        { name: 'Comunicazioni Intrastat Vendite (solo invio predisposto dal cliente)', price: '€ 35*' },
        { name: 'Comunicazioni Intrastat Acquisti (da compilare sulla base delle fatture pervenute direttamente dal cliente)', price: '€ 98*' },
        { name: 'Comunicazioni Intrastat Vendite (da compilare sulla base delle fatture pervenute direttamente dal cliente)', price: '€ 98*' },
        { name: 'Licenza Alcolici (somministrazione e vendita alimentari)', price: '€ 100' },
      ],
    },
    { title: 'Ries', items: [{ name: 'Richiesta / Variazione / Rinnovo annuale', price: '€ 130*' }] },
    URGENZA,
  ],

  'agenzia-territorio': [
    {
      title: 'Catasto',
      items: [
        { name: 'Visure e certificati Catastali', price: '€ 55' },
        { name: 'Planimetrie', price: '€ 65*' },
        { name: 'Estratto di Mappa', price: '€ 50' },
        { name: 'Volture catastali', price: '€ 106*' },
        { name: 'Presentazioni di istanze di Rettifiche e Mod. 701', price: 'Da concordare' },
      ],
    },
    {
      title: 'Conservatoria dei Registri Immobiliari',
      items: [
        { name: 'Certificazione storica ventennale', price: '€ 98*' },
        { name: 'Ispezioni ipotecarie – Accesso', price: '€ 60*' },
        { name: 'Ispezioni ipotecarie – per ogni nota da consultare', price: '€ 7*' },
        { name: 'Richiesta di copia atti di Trascrizione, etc.', price: '€ 50' },
        { name: 'Presentazione note di Trascrizione, Annotamenti e Iscrizioni (comprensiva di analisi e compilazione del relativo adempimento)', price: '€ 110' },
        { name: 'Accessi ipocatastali su tutta Italia', price: 'Da concordare' },
      ],
    },
    URGENZA,
  ],

  'servizi-ambientali': [
    {
      title: 'Rentri',
      items: [
        { name: 'Adesione', price: 'Da concordare' },
        { name: 'Iscrizione - modifica', price: 'Da concordare' },
        { name: 'Tenuta Formulario', price: 'Da concordare' },
        { name: 'Tenuta del Registro di Carico e Scarico rifiuti', price: 'Da concordare' },
      ],
    },
    {
      title: 'R.a.e.e / A.e.e. (Registro Pile ed apparecchiature elettroniche)',
      items: [
        { name: 'Iscrizione / rinnovo annuale', price: '€ 200' },
        { name: 'Variazione', price: '€ 150' },
      ],
    },
    {
      title: 'Albo Gestori Ambientali',
      items: [
        { name: 'Iscrizione', price: '€ 300' },
        { name: 'Variazione / rinnovo iscrizione', price: '€ 250' },
      ],
    },
    {
      title: 'Mud',
      items: [
        { name: 'Comunicazione Annuale (compilazione + spedizione)', price: '€ 200' },
        { name: 'Comunicazione Annuale (sola spedizione file del cliente)', price: '€ 50' },
      ],
    },
    {
      title: 'Altre Prestazioni Professionali',
      items: [
        { name: 'Valutazione impatto acustico', price: 'Da concordare' },
        { name: 'Autorizzazione emissioni in atmosfera', price: 'Da concordare' },
      ],
    },
    URGENZA,
  ],

  'servizio-estero': [
    { title: 'Consolati - Ambasciate', items: [{ name: 'Richiesta Visti e Vidimazioni sui documenti per l’estero', price: '€ 170*' }] },
    {
      title: 'Documenti commerciali',
      items: [
        { name: 'Richiesta e stampa Certificati di Origine', price: '€ 90' },
        { name: 'Legalizzazioni dei documenti per l’estero', price: '€ 60*' },
        { name: 'Richiesta/rinnovo cod. meccanografico', price: '€ 55' },
        { name: 'Carnet ATA', price: '€ 150*' },
      ],
    },
    URGENZA,
  ],

  varie: [
    { title: 'Accesso agli uffici degli Enti Pubblici', price: '€ 70' },
    { title: 'Accesso agli uffici in altri comuni', price: 'A preventivo' },
    { title: 'Pagamento c/o banche – poste', price: '€ 30*' },
    { title: 'Pagamento – PAGO PA', price: '€ 10*' },
    { title: 'Codice LEI - Legal Entity Identifier (richiesta – rinnovo con attestato)', price: '€ 155*' },
    { title: 'Pubblicazioni on line Gazzetta Ufficiale', price: '€ 95*' },
    { title: 'Estratti e vidimazioni presso Notaio', price: '€ 87*' },
    { title: 'Traduzione documenti legali', price: 'A preventivo' },
    { title: 'Piantine in scala a cura di professionisti abilitati', price: 'A preventivo' },
    { title: 'Diritto d’urgenza', price: 'Da € 20 a € 50*' },
    { title: 'Consegna/ritiro documenti', price: '€ 15*' },
    { title: 'Diritto fisso', price: '€ 3*' },
  ],

  'uffici-esterni': [
    {
      title: 'Camera di Commercio Industria e Artigianato',
      items: [
        { name: 'Copia Atti/Bilanci', price: '€ 30*' },
        { name: 'Certificati Registro Imprese', price: '€ 39*' },
        { name: 'Certificato Storico Registro Imprese', price: '€ 39*' },
        { name: 'Certificazioni Albi e Ruoli tenuti dalla C.C.I.A.A.', price: '€ 39*' },
        { name: 'Visura Registro Imprese', price: '€ 30*' },
        { name: 'Visura assetto proprietario Registro Imprese', price: '€ 30*' },
        { name: 'Visura protesti', price: '€ 30*' },
        { name: 'Visura albi ruoli', price: '€ 30*' },
        { name: 'Visura storica Registro Imprese', price: '€ 30*' },
        { name: 'Controllo per diritti annuali Camerali', price: '€ 55*' },
        { name: 'Copia atti da fascicolo Registro Imprese', price: '€ 39*' },
        { name: 'Consultazioni fascicoli Registro Imprese', price: '€ 45*' },
        { name: 'Visti / Vidimazione firma presso C.C.I.A.A.', price: '€ 50*' },
        { name: 'Vidimazione listino prezzi', price: '€ 45*' },
        { name: 'Vidimazione libri sociali e registri', price: '€ 58*' },
        { name: 'Fascicolazione e Stampa libri e registri (per 100 pag.)', price: '€ 25*' },
        { name: 'Per ulteriori multipli (ogni 100 pag. – costo carta compresa)', price: '€ 6*' },
        { name: 'Raccoglitori ad anelli per registri', price: '€ 15*' },
      ],
    },
    {
      title: 'Comune – anagrafiche certificazioni',
      items: [
        { name: 'Certificato anagrafico A.I.R.E.', price: '€ 33*' },
        { name: 'Certificato anagrafico', price: '€ 33*' },
        { name: 'Estratti e certificati di Stato Civile', price: '€ 40*' },
        { name: 'Certificato iscrizione liste elettorali', price: '€ 40*' },
        { name: 'Copia integrale atti di Stato Civile', price: '€ 40*' },
        { name: 'Vidimazione registri', price: '€ 55*' },
        { name: 'Richiesta copie condoni, licenze e certificazioni', price: 'Da concordare' },
      ],
    },
    {
      title: 'Tribunale',
      items: [
        { name: 'Certificato della Cancelleria Fallimentare', price: '€ 49' },
        { name: 'Certificato carichi pendenti', price: '€ 49' },
        { name: 'Certificato generale del Casellario Giudiziale', price: '€ 49' },
        { name: 'Certificato di non opposizione', price: '€ 49' },
        { name: 'Registrazioni per giornali e periodici', price: '€ 120*' },
        { name: 'Certificato per giornali e periodici', price: '€ 49' },
        { name: 'Certificato Esecuzioni Immobiliari', price: '€ 49' },
        { name: 'Legalizzazione documenti Civili', price: '€ 60*' },
        { name: 'Notifiche Ufficiali Giudiziari', price: '€ 50' },
        { name: 'Accesso ritiro notifiche', price: '€ 50' },
        { name: 'Presentazione e ritiro atti-documenti presso le cancellerie', price: '€ 60*' },
        { name: 'Copia atti Archivio Notarile', price: '€ 60*' },
      ],
    },
    {
      title: 'Agenzia Entrate',
      items: [
        { name: 'Presentazione documenti per rimborso IVA', price: '€ 45*' },
        { name: 'Certificazioni IVA', price: '€ 40*' },
        { name: 'Richiesta codice fiscale', price: '€ 59*' },
        { name: 'Certificati (Carichi pendenti fiscali / Doppie Imposizioni)', price: '€ 70*' },
        { name: 'Certificato DURF', price: '€ 50*' },
        { name: 'CIVIS (gestione istanze di autotutela)', price: '€ 80' },
        { name: 'Verifica cartelle di pagamento Agenzia Riscossione', price: '€ 60' },
      ],
    },
  ],

  'operatori-finanziari': [
    {
      title: 'Servizi in outsourcing',
      items: [
        { name: 'Gestione anagrafica dei rapporti mensili – canone annuale (prezzo minimo)', price: '€ 600*' },
        { name: 'Gestione delle indagini finanziarie – costo per la gestione di ogni singola indagine', price: '€ 150*' },
        { name: 'Comunicazione REI – Registro Indirizzo PEC – costo per ogni PEC da comunicare', price: '€ 85*' },
        { name: 'CRS comunicazione dei rapporti esteri – costo per ogni comunicazione', price: '€ 150*' },
        { name: 'Comunicazioni annuali Utenze – canone annuale (prezzo minimo)', price: '€ 600*' },
        { name: 'Antiriciclaggio – canone annuale (prezzo minimo)', price: '€ 600*' },
      ],
    },
  ],

  'servizi-digitali': [
    {
      title: 'Firma Digitale e Marche Temporali',
      items: [
        { name: 'Rilascio firma digitale SMART CARD CNS', price: '€ 85*' },
        { name: 'Rilascio firma digitale BUSINESS KEY CNS', price: '€ 145*' },
        { name: 'Rilascio firma digitale REMOTA', price: '€ 95*' },
        { name: 'Rilascio SPID', price: '€ 50*' },
        { name: 'Rinnovo SMART CARD – BUSINESS KEY', price: '€ 65*' },
        { name: 'Fornitura Lettore SMART CARD', price: '€ 38*' },
        { name: 'Accesso per attività di riconoscimento a domicilio – firma digitale', price: '€ 60*' },
        { name: 'Marche temporali (pacchetto da 100)', price: '€ 50*' },
        { name: 'Assistenza di primo livello per utilizzo della Firma Digitale (costo triennale all’attivazione del dispositivo di firma)', price: '€ 60*' },
      ],
    },
    {
      title: 'PEC',
      items: [
        { name: 'Rilascio/rinnovo casella PEC adempiopec.it Lite', price: '€ 15*' },
        { name: 'Rilascio/rinnovo casella PEC adempiopec.it Pro', price: '€ 25*' },
        { name: 'Rilascio/rinnovo casella PEC adempiopec.it Ultra', price: '€ 49*' },
        { name: 'Rilascio/rinnovo casella PEC Legalmail standard - bronze', price: '€ 27*' },
        { name: 'Rilascio/rinnovo casella PEC Legalmail silver', price: '€ 42*' },
        { name: 'Rilascio/rinnovo casella PEC Legalmail gold', price: '€ 80*' },
      ],
    },
  ],
}
