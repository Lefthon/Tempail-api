const axios = require('axios');

const BASE = 'https://tempail.top/api';
const HEADERS = { 'user-agent': 'Postify/1.0.0' };

module.exports = {
  createEmail: async () => {
    const res = await axios.post(`${BASE}/email/create/ApiTempail`, null, { headers: HEADERS });
    return res.data;
  },

  getMessages: async (token) => {
    const res = await axios.get(`${BASE}/messages/${token}/ApiTempail`, { headers: HEADERS });
    return res.data;
  },

  getMessage: async (id) => {
    const res = await axios.get(`${BASE}/message/${id}/ApiTempail`, { headers: HEADERS });
    return res.data;
  }
};
