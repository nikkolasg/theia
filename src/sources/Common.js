const newRow = (plat,token,usd)  => { 
    return {
        platform: plat.toLowerCase(),
        token:token.toLowerCase(),
        usd:usd
    }; 
};

async function getPriceUSD(symbol) {
    const req = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol}?tickers=true&community_data=false&developer_data=false&sparkline=false`, 
        { headers: { accept : "application/json" }});
    const json = await req.json();
    return json["market_data"]["current_price"]["usd"];
}

export {
    getPriceUSD,
    newRow,
}
