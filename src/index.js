const express = require("express");
const morgan = require("morgan");

const { createProxyMiddleware } = require("http-proxy-middleware");
const { PORT, BOOKING_SERVICE, AUTH_SERVICE, SEARCH_SERVICE, REMINDER_SERVICE } = require("./config/serverCongif");
const isAuthenticated = require("./middleware/isAuthenticated");
const rateLimiter = require("./middleware/rateLimit");


const server = () => {

    const app = express();

    app.use(morgan('combined'));
    app.use(rateLimiter);
    app.use("/bookingservice",isAuthenticated);

    app.use("/searchservice", createProxyMiddleware({target: SEARCH_SERVICE, changeOrigin: true}));
    app.use("/authservice", createProxyMiddleware({target: AUTH_SERVICE , changeOrigin: true}));
    app.use("/bookingservice", createProxyMiddleware({target: BOOKING_SERVICE, changeOrigin: true}));
    app.use("/reminderservice", createProxyMiddleware({target: REMINDER_SERVICE, changeOrigin: true}));

    app.get('/home' , (req,res) => {
        return res.json({
            message: `API Gateway Working Successfully`,
            statusCode: 200,
            data: {
                authorName: "Shubham Jain",
                githubURL: `https://github.com/Shubhamjain287`
            }
        })
    });

    app.listen(PORT, () => {
        console.log(`Server os Running on PORT: ${PORT}`);
    })

}

server();