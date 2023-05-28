const express = require('express');
const jwt = require('jsonwebtoken');
const {auth} = require('../middlewares/Authentication');
const { UserError } = require('../middlewares/ErrorHandler');
const {currentMatchTeams} = require('../data/teamsData');
const {raidLeagueMatch, pickBanLimit} = require('../data/matchData');
const { emitter } = require('../sockets/socketsEvents');
const { matchObChange } = require('../constants/emitters');
const { readyCheckHandler, pickNBanHandler, setSquadHandler, logHandler } = require('../utils/matchDraftController');

const router = express.Router(); // Simplification Router Name


//*********************************************************** GET REQUESTS **************************************************************************** */

// Authentication validation for a given token.
router.get('/validation',auth, async (req,res,next)=>{
    try{
        res.send({name: req.headers.team});
    }
    catch(error) {return next(error); }
});

// Returns the pick and ban numerous limit.
router.get('/pick-and-ban-limit',async(req,res,next)=>{
    try{
        res.send(pickBanLimit);
    }
    catch(error) {return next(error); }
});

//*********************************************************** POST REQUESTS **************************************************************************** */

// Given user credentials returns a specified token.
router.post('/auth', async (req,res,next)=>{
    try{
        const credentials = req.body.credentials;
        const team = currentMatchTeams.find( (team) => team.code === credentials );
        if(!team) return next(new UserError('Invalid Credentials Code.', 404));
        const token = jwt.sign({payload: team.name} , process.env.SECRET , {expiresIn: "4h"});
        if(!raidLeagueMatch.team1.name){ 
            raidLeagueMatch.team1.name = team.name;
            raidLeagueMatch.currentTurn = team.name;
        }else if(!raidLeagueMatch.team2.name && raidLeagueMatch.team2.name !== raidLeagueMatch.team1.name) raidLeagueMatch.team2.name = team.name;
        res.send({token , name: team.name});
    }
    catch(error){ return next(error); }
});


//*********************************************************** PATCH REQUESTS **************************************************************************** */

// Verifies which team is ready and emits the ready check.
router.patch('/ready-check', auth , async (req,res,next)=>{
    try{
        readyCheckHandler(req.headers.team);
        emitter.emit(matchObChange);
        res.send({name: req.headers.team});
    }
    catch(error){ return next(error); }
});

// Updates the pick/ban array and emits the change.
router.patch('/pick-and-ban',auth,async(req,res,next)=>{
    try{
        pickNBanHandler(req.headers.team, req.body.spec);
        emitter.emit(matchObChange);
        res.send({name: req.headers.team});
    }
    catch(error){ return next(error); }
});

// Updates the teams squad array and emits the change.
router.patch('/squad',auth, async(req,res,next)=>{
    try{
        setSquadHandler(req.headers.team, req.body.squad);
        emitter.emit(matchObChange);
        res.send({name: req.headers.team});
    }
    catch(error){ return next(error); }
});

// Updates the teams match logs
router.patch('/log',auth,async(req,res,next)=>{
    try{
        logHandler(req.headers.team , req.body.log);
        emitter.emit(matchObChange);
        res.send({name: req.headers.team});
    }
    catch(error){ return next(error); }
});

module.exports = router;