const axios = require("axios");
const { AUTH_SERVICE } = require("../config/serverCongif");

const isAuthenticated = async (req,res,next) => {
    try {
        
        const token = req.headers['x-access-token'];
        
        if(!token){
            return res.status(401).json({
                message: "No Token Found - Unauthorised Access"
            })
        }

        const response = await axios.get(`${AUTH_SERVICE}/authservice/api/v1/isAuthenticated`,{ headers: {
            'x-access-token' : token
        } 
        });
        console.log(response.data);
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = isAuthenticated;