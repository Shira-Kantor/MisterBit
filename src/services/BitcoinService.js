import axios from 'axios';
export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}


async function getRate(coins) {
    const response = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`);
    return response.data;
  }
  

  async function getMarketPrice() {
    const response = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true');
    return response.data.values.map(({ x, y }) => [x * 1000, y]);
  }
  
  async function getConfirmedTransactions() {
    const response = await axios.get('https://api.blockchain.info/charts/n-transactions?format=json&cors=true');
    return response.data.values.map(({ x, y }) => [x * 1000, y]);
  }
  