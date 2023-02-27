const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message: 'You have exceeded the 5 requests in 2 Miniutes limit !!', 
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = rateLimiter;