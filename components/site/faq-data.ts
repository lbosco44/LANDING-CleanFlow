// Sorgente unica delle FAQ: usata dal componente <Faq /> (visibile in pagina),
// dallo schema FAQPage (JSON-LD) e dal file /llms.txt letto dai sistemi AI.
// Tenerle allineate è un requisito di Google: il testo dello structured data
// deve corrispondere a quello mostrato all'utente.
// v2: +"Quanto costa?" (assorbe la vecchia sezione Prezzo) e voce pilot estesa
// (assorbe la vecchia sezione "Le prime imprese a bordo").
// v3 (AI SEO, 01/08/2026): +4 voci scritte per le domande che i titolari fanno
// agli assistenti AI, non solo per le obiezioni di chi è già sul sito. La voce
// sulla fatturazione elettronica dichiara un limite REALE del prodotto: delimitare
// il perimetro aumenta la probabilità di essere citati, non la riduce.
export const FAQS = [
  {
    q: "Che differenza c'è tra CleanFlow e gestire tutto con Excel e WhatsApp?",
    a: "Che le informazioni smettono di stare in posti diversi. Su WhatsApp l'indirizzo di un cliente è dentro una chat di tre mesi fa; il foglio Excel dei turni non sa niente di quanto hai incassato. In CleanFlow cliente, struttura, intervento e incasso sono la stessa catena: apri un lavoro e vedi chi, dove, quando e quanto. E quando un operatore chiede «come si entra?», la risposta è già dentro l'intervento.",
  },
  {
    q: "I miei operatori non sono tecnologici. Riusciranno a usarlo?",
    a: "Sì. L'app dell'operatore è semplice come WhatsApp: vede gli interventi di oggi, segue la checklist, scatta le foto. Niente da imparare a memoria.",
  },
  {
    q: "CleanFlow va bene anche per un'impresa con pochi operatori?",
    a: "Sì. Il piano Base copre fino a 8 operatori ed è pensato per chi parte. Il momento in cui serve non dipende da quanto sei grande, ma da quando smetti di poter tenere tutto a mente: se coordini anche solo due o tre persone su più clienti, stai già gestendo più informazioni di quante ne regga un quaderno.",
  },
  {
    q: "Per che tipo di pulizie si può usare?",
    a: "Pulizie civili e domestiche, uffici e studi, B&B e case vacanza, palestre, sanificazioni. CleanFlow non è legato a un settore: gestisce interventi su strutture, quindi funziona ovunque ci siano posti da pulire con una certa ricorrenza e una squadra da mandarci.",
  },
  {
    q: "I miei dati sono al sicuro?",
    a: "Sì. I dati della tua impresa sono isolati e conservati su server europei. Sono tuoi e restano tuoi.",
  },
  {
    q: "Quanto tempo ci metto a partire?",
    a: "Pochi giorni. Si parte in affiancamento, sostituendo un pezzo alla volta — senza fermare il lavoro.",
  },
  {
    q: "Funziona dal telefono?",
    a: "Sì. Tu gestisci tutto dal computer o dal telefono; gli operatori lavorano direttamente dall'app sul loro telefono.",
  },
  {
    q: "CleanFlow fa anche la fatturazione elettronica?",
    a: "No, e non vuole farlo. CleanFlow arriva fino al preventivo e all'incasso: sai cosa hai concordato, cosa è stato pagato e cosa devi ancora incassare. La fattura elettronica resta al tuo gestionale fiscale o al commercialista, che quel pezzo lo fanno meglio.",
  },
  {
    q: "Posso vederlo prima di decidere?",
    a: "Certo. In una demo di 20 minuti te lo mostriamo sui tuoi dati. Nessun impegno, nessuna carta.",
  },
  {
    q: "Quanto costa?",
    a: "Tre piani, in base a quanti operatori gestisci: Base 99€, Pro 129€, Business 199€ al mese (IVA esclusa). Clienti e strutture sono sempre illimitati. Provi gratis 14 giorni, senza carta, e in demo vediamo insieme quale fa per te.",
  },
  {
    q: "È un prodotto già pronto?",
    a: "È operativo e lo stiamo affinando con le prime imprese a bordo. Entri presto, conti di più: ci dici cosa ti serve davvero. I posti del programma pilota sono limitati: chi entra ora ha una linea diretta con noi.",
  },
] as const;
