// Sorgente unica delle FAQ: usata dal componente <Faq /> (visibile in pagina)
// e dallo schema FAQPage (JSON-LD). Tenerle allineate è un requisito di Google:
// il testo dello structured data deve corrispondere a quello mostrato all'utente.
// v2: +"Quanto costa?" (assorbe la vecchia sezione Prezzo) e voce pilot estesa
// (assorbe la vecchia sezione "Le prime imprese a bordo").
export const FAQS = [
  {
    q: "I miei operatori non sono tecnologici. Riusciranno a usarlo?",
    a: "Sì. L'app dell'operatore è semplice come WhatsApp: vede gli interventi di oggi, segue la checklist, scatta le foto. Niente da imparare a memoria.",
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
