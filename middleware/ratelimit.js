const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 30, // max 30 request per menit per IP
  message: {
    status: 429,
    error: 'Batas penggunaan API tercapai. Coba lagi dalam 1 menit.'
  }
});

module.exports = limiter;
