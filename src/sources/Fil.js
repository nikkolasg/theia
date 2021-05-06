import { getPriceUSD, newRow } from "./Common.js";

async function fetch_fil(key) {
    const resp = await fetch(`https://filfox.info/api/v1/address/${key}`);
    const json = await resp.json();
    if (json["statusCode"]) {
        throw new Error("Invalid FIL request");
    }
    const balance = json["balance"] / Math.pow(10,18);
    const price = await getPriceUSD("filecoin");
    return newRow("FIL", "FIL", balance * price);
}

const inputs_fil = () => { };

export {
    fetch_fil,
    inputs_fil,
}
