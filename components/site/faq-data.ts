// Sorgente unica delle FAQ: usata dal componente <Faq /> (visibile in pagina)
// e dallo schema FAQPage (JSON-LD). Tenerle allineate è un requisito di Google:
// il testo dello structured data deve corrispondere a quello mostrato all'utente.
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
    q: "È un prodotto già pronto?",
    a: "È operativo e lo stiamo affinando con le prime imprese a bordo. Entri presto, conti di più: ci dici cosa ti serve davvero.",
  },
] as const;
