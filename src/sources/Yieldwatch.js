import { newRow } from "./Common.js";

async function fetch_yieldwatch(key) {
    console.log("YieldWatch fetching"); 
    const platforms_url = ["beefy","pancake","auto","bunny"];
    const params = platforms_url.join(",");
    const resp = await fetch(`https://www.yieldwatch.net/api/all/${key}?platforms=${params}`);
    const json = await resp.json();
    if (json.status === "0") {
        throw new Error(`Invalid request for Yieldwatch (maybe invalid address? ${key} - response ${JSON.stringify(json)}`);
    }
    const results = json["result"]; 
    const fetch_vault = (plat) => {
        return results[plat]["vaults"]["vaults"].map(item => {
            const deposit_usd = item["priceInUSDDepositToken"];
            const reward_usd = item["priceInUSDRewardToken"];
            const current_tokens = item["currentTokens"];
            const pending_rewards = item["pendingRewards"];
            const total = deposit_usd * current_tokens + reward_usd * pending_rewards;
            return newRow(plat, item["depositToken"], total);
        });
    };
    const fetch_stake = (plat) => {
        return results[plat]["staking"]["vaults"].map(item => {
            const usd_price = item["priceInUSDDepositToken"]
            const deposited = item["depositedTokens"]
            const pending = item["pendingRewards"]
            const total = usd_price * (deposited + pending)
            return newRow(plat, item["depositToken"], total);
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

const inputs_yieldwatch = () => {};

export {
    fetch_yieldwatch,
    inputs_yieldwatch,
}
