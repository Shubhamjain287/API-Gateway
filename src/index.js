const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const { createProxyMiddleware } = require("http-proxy-middleware");
const { PORT } = require("./config/serverCongif");

const server = () => {

    const app = express();

    app.use(morgan('combined'));

    const limiter = rateLimit({
        windowMs: 2 * 60 * 1000,
        max: 5
    });

    app.use(limiter);

    app.use("/bookingservice", createProxyMiddleware({target: "http://localhost:2805", changeOrigin: true}));

    app.get('/api-gateway' , (req,res) => {
        return res.json({
            message: `API Gateway Working Successfully`
        })
    })

    app.listen(PORT, () => {
        console.log(`Server os Running on PORT: ${PORT}`);
    })

}

server();