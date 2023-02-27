const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SEARCH_SERVICE : process.env.SEARCH_SERVICE,
    AUTH_SERVICE : process.env.AUTH_SERVICE,
    BOOKING_SERVICE : process.env.BOOKING_SERVICE,
    REMINDER_SERVICE : process.env.REMINDER_SERVICE
}