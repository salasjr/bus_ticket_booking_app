const jwt = require('jsonwebtoken');
const busOwner = require('../models/busowner/busowner');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await busOwner.findOne({
            _id: decoded._id,
        })
      
        if (!user) {
            throw new Error('Unable to login , invalid credentials');
        }

        req.user = user;
        req.token = token;
        next();
    }
    catch (error) { 
        res.status(401).send({ error: error.message});
    }
}

module.exports = auth;