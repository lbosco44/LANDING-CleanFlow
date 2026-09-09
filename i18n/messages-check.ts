import it from "@/messages/it.json";
import en from "@/messages/en.json";

// next-intl tipizza le chiavi solo sul dizionario italiano (global.d.ts): un
// `en.json` con una chiave in meno, o con `Prezzi.perMonth` rimasto stringa
// invece di oggetto per valuta, passerebbe il build e renderizzerebbe "£"
// seguito da vuoto. Questo file non esporta niente di usato: esiste perché
// `tsc` lo legga e faccia fallire il build se la forma inglese diverge da
// quella italiana (chiavi in più o in meno, tipi diversi).
export const messagesShapeCheck = en satisfies typeof it;
