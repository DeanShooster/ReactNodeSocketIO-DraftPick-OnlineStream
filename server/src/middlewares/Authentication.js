const jwt = require('jsonwebtoken');
const {currentMatchTeams} = require('../data/teamsData');
const { UserError } = require('../middlewares/ErrorHandler');

const auth = async (req,res,next) => {
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token,process.env.SECRET);
        req.headers.team = currentMatchTeams.find( (team) => team.name === decoded.payload ).name;
        next();
    }
    catch(error){ 
        if(error.message === 'invalid token' || error.message === 'jwt expired') return next(new UserError('No Authentication.',401));
        return next(error); 
    }
}

module.exports = auth;