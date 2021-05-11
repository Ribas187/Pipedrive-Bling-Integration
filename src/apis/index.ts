import axios from 'axios';

const pipedriveApi = axios.create({
  baseURL: `https://${process.env.PIPEDRIVE_COMPANY_DOMAIN}.pipedrive.com/api/v1/`,
  params: {
    api_token: process.env.PIPEDRIVE_API_TOKEN,
  },
});

const blingApi = axios.create({
  baseURL: 'https://bling.com.br/Api/v2/',
  params: {
    apikey: process.env.BLING_API_TOKEN,
  },
});

export { pipedriveApi, blingApi };
