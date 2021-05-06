import { fetch_fil, inputs_fil } from "./sources/Fil.js";
import { fetch_yieldwatch, inputs_yieldwatch } from "./sources/Yieldwatch.js";

const sources = [
  { 
        label: "Yieldwatch (BSC)", 
        fetch: fetch_yieldwatch,
        inputs: inputs_yieldwatch,
  },
  { 
      label: "Filfox (FIL)", 
      fetch: fetch_fil,
      inputs: inputs_fil,
  },
  { label: "Kraken", fetch:  nop },
  { label: "Binance", fetch: nop  }
];

async function fetch_from(entry) {
    console.log("\t FETCH FROM called on: ",entry);
    const source = sources.find(e => e.label === entry.type);
    if (source === undefined) {
        throw new Error("Error undefined source", entry);
    }
    return await source.fetch(entry.key);
}

async function nop() {
    console.log("NOT IMPLEMENTED YET");
    return [];
}
export {
    sources,
    fetch_from,
}
//exports.sources = sources;
//exports.fetch_from = fetch_from;
