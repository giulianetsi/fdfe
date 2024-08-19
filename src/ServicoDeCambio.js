import axios from 'axios';

const API_KEY = 'caf460abe7d9fc4919ce6461';
const BASE_URL = 'https://open.er-api.com/v6/latest/';

export const obterTaxasDeCambio = async (moedaBase) => {
  try {
    const response = await axios.get(`${BASE_URL}${moedaBase}`);
    return response.data.rates;
  } catch (error) {
    console.error('Erro ao obter taxas de câmbio:', error);
    throw error;
  }
};
