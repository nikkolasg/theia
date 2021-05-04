const sources = [
  { label: "Yieldwatch (BSC)", method: fetch_yieldwatch },
  { label: "Kraken", value:  nop },
  { label: "Binance", value: nop  }
];

async function fetch_from(entry) {
    const source = sources.find(e => e.label == entry.type);
    if (source == undefined) {
        console.log("ERROR FETCH FROM UNDEFINED ",entry);
        throw "Error undefined source";
    }
    return await source.method(entry.key);
}

async function fetch_yieldwatch(key) {
    console.log("YieldWatch fetching"); 
    const platforms_url = ["beefy","pancake","auto","bunny"];
    const params = platforms_url.join(",");
    const resp = await fetch(`https://www.yieldwatch.net/api/all/${key}?platforms=${params}`);
    const json = await resp.json();
    if (json.status == "0") {
        throw "Invalid request (maybe invalid address?";
    }
    const results = json["result"]; 
    const fetch_vault = (plat) => {
        return results[plat]["vaults"]["vaults"].map(item => {
            const deposit_usd = item["priceInUSDDepositToken"];
            const reward_usd = item["priceInUSDRewardToken"];
            const current_tokens = item["currentTokens"];
            const pending_rewards = item["pendingRewards"];
            const total = deposit_usd * current_tokens + reward_usd * pending_rewards;
            return { 
                platform: plat, 
                token: item["depositToken"].toLowerCase(), 
                usd: total 
            };
            });
    };
    const fetch_stake = (plat) => {
        return results[plat]["staking"]["vaults"].map(item => {
            const usd_price = item["priceInUSDDepositToken"]
            const deposited = item["depositedTokens"]
            const pending = item["pendingRewards"]
            const total = usd_price * (deposited + pending)
            return {
                platform: plat,
                token: item["depositToken"],
                usd: total
            };
        });
    };
    const platforms = { // TODO more
        "bunny": [fetch_vault,fetch_stake],
        "Autofarm": [fetch_vault]
    }; 
    return Object.entries(platforms).map(([plat, fetches]) => {
        return fetches.map(f => f(plat)).flat()
    }).flat()
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
