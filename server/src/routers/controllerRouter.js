const express = require('express');
const jwt = require('jsonwebtoken');
const {adminAuth} = require('../middlewares/Authentication');
const { UserError } = require('../middlewares/ErrorHandler');
const { currentMatchTeams, allTeams } = require('../data/teamsData');
const { pickBanLimit } = require('../data/matchData');
const { raidLeagueMatch } = require('../data/matchData');
const { emitter } = require('../sockets/socketsEvents');
const { matchObChange } = require('../constants/emitters');

const router = express.Router();

//************************************************  GET REQUESTS  *************************************************************** */

// Authentication.
router.get('/admin-login',adminAuth, async(req,res,next)=>{
    try{
        res.send({});
    }
    catch(error) {return next(error); }
});

// Returns the Draft Pick/Ban Settings.
router.get('/settings', async(req,res,next)=>{
    try{
        const settings = {
            pickNban: pickBanLimit,
            teams: allTeams,
            match: currentMatchTeams
        };
        res.send({settings});
    }
    catch(error) {return next(error); }
});

//************************************************  POST REQUESTS  *************************************************************** */

// Admin login , returns a specified token.
router.post('/admin-login',async (req,res,next)=>{
    try{
        const adminPassword = req.body.password;
        if(adminPassword !== process.env.ADMIN_PASSWORD) return next(new UserError('Invalid Admin Credentials', 404));
        const token = jwt.sign({payload: adminPassword} , process.env.ADMIN_SECRET , {expiresIn: "4h"});
        res.send({token});
    }
    catch(error) {return next(error); }
});

//************************************************  PATCH REQUESTS  *************************************************************** */

// Updates the pick & ban object.
router.patch('/update/pick-ban',adminAuth,async (req,res,next)=>{
    try{
        const pickBan = req.body.pickBan;
        pickBanLimit.ban = pickBan.ban; pickBanLimit.pick = pickBan.pick;
        res.send(pickBanLimit);
    }
    catch(error) {return next(error); }
});

// Adds a new team.
router.patch('/update/new-team',adminAuth,async (req,res,next)=>{
    try{
        const { team } = req.body;
        for(let i = 0; i < allTeams.length; i++)
            if(allTeams[i].name === team.name ) return next(new UserError('Duplication', 404));
        allTeams.push(team);
        res.send(team);
    }
    catch(error) {return next(error); }
});

// Edits an existed team.
router.patch('/update/edit-team',adminAuth,async (req,res,next)=>{
    try{
        const {teamEdition}  = req.body;
        for(let i = 0; i < allTeams.length; i++)
            if(allTeams[i].name === teamEdition.name){
                allTeams[i].name = teamEdition.newName; allTeams[i].code = teamEdition.newCode;
                break;
            }
        res.send(teamEdition);
    }
    catch(error) {return next(error); }
});

// Resets the match draft.
router.patch('/update/reset',adminAuth,async (req,res,next)=>{
    try{
        raidLeagueMatch.team1 = { name: null, draftReadyCheck: false, bans: [],picks: [],squad: [],matchReadyCheck: false,log: null , matchResults: []};
        raidLeagueMatch.team2 = { name: null, draftReadyCheck: false, bans: [],picks: [],squad: [],matchReadyCheck: false,log: null , matchResults: []};
        raidLeagueMatch.draftStage = 1; raidLeagueMatch.currentTurn = null; raidLeagueMatch.pickNBanTurns = 1; raidLeagueMatch.round = 1; raidLeagueMatch.bosses = [null,null,null,null,null];
        currentMatchTeams[0] = null; currentMatchTeams[1] = null;
        emitter.emit(matchObChange);
        res.send(raidLeagueMatch);
    }
    catch(error) {return next(error); }
});

// Updates the next match teams so they can login.
router.patch('/update/next-match',adminAuth,async (req,res,next)=>{
    try{
        const {team1,team2} = req.body;
        if(!team1 || !team2) return next(new UserError('Invalid Team value', 404));
        const codes = [0,0];
        for(let i = 0; i < allTeams.length; i++){
            if(allTeams[i].name === team1) codes[0] = allTeams[i].code;
            if(allTeams[i].name === team2) codes[1] = allTeams[i].code;
        }
        currentMatchTeams[0] = {name : team1 , code: codes[0] }; currentMatchTeams[1] = {name : team2 , code: codes[1]};
        res.send({team1: currentMatchTeams[0].name , team2: currentMatchTeams[1].name});
    }
    catch(error) {return next(error); }
});

// Updates the winner-loser and update the round.
router.patch('/update/winner',adminAuth, async (req,res,next)=>{
    try{
        const winner = req.body.name;
        if(!winner) return next(new UserError('Invalid Winner value',404));
        if(raidLeagueMatch.team1.name === winner){ raidLeagueMatch.team1.matchResults.push(true); raidLeagueMatch.team2.matchResults.push(false); }
        else{ raidLeagueMatch.team2.matchResults.push(true); raidLeagueMatch.team1.matchResults.push(false); }
        raidLeagueMatch.round = raidLeagueMatch.round + 1;
        raidLeagueMatch.team1.draftReadyCheck = false;  raidLeagueMatch.team1.bans = [];  raidLeagueMatch.team1.picks = [];  raidLeagueMatch.team1.squad = [];
        raidLeagueMatch.team1.matchReadyCheck = false;  raidLeagueMatch.team1.log = null;
        raidLeagueMatch.team2.draftReadyCheck = false;  raidLeagueMatch.team2.bans = [];  raidLeagueMatch.team2.picks = [];  raidLeagueMatch.team2.squad = [];
        raidLeagueMatch.team2.matchReadyCheck = false;  raidLeagueMatch.team2.log = null;
        emitter.emit(matchObChange);
        res.send(raidLeagueMatch);
    }
    catch(error) {return next(error); }
});

module.exports = router;