const { raidLeagueMatch, pickBanLimit } = require("../data/matchData");
const { bossesDraft } = require("./bossesDraft");

/**
 * Updates the team ready check status.
 * @param {String Team Name} teamName 
 */
function readyCheckHandler(teamName){
    const { team1, team2, draftStage } = raidLeagueMatch ?? {};
    if(!teamName || !team1 || !team2) return;
    if(team1.name === teamName){
        if(draftStage === 1) team1.draftReadyCheck = true;
        else if(draftStage === 4) team1.matchReadyCheck = true;
    } else {
        if(draftStage === 1) team2.draftReadyCheck = true;
        else if(draftStage === 4) team2.matchReadyCheck = true;
    }
    draftStageHandler();
}

/**
 * Given a team name checks if its current turn in the pick and ban draft stage.
 * @param {String Team Name} teamName 
 */
function pickNBanTurnHandler(teamName){
    const { team1, team2 , pickNBanTurns } = raidLeagueMatch ?? {};
    if(pickNBanTurns < 5){
        if(pickNBanTurns === 1 || pickNBanTurns === 3 || pickNBanTurns === 4) raidLeagueMatch.currentTurn = team2.name;
        else raidLeagueMatch.currentTurn = team1.name;
        raidLeagueMatch.pickNBanTurns = raidLeagueMatch.pickNBanTurns + 1;
    }else{
        if(team1.name === teamName) raidLeagueMatch.currentTurn = team2.name;
        else raidLeagueMatch.currentTurn = team1.name;
    }
}

/**
 * Updates the pick and ban teams object.
 * @param {String Team Name} teamName 
 * @param {String Spec Name} specName 
 */
function pickNBanHandler(teamName,specName){
    if(!specName || !teamName) return;
    const { team1, team2, draftStage } = raidLeagueMatch ?? {};
    if(!teamName || !team1 || !team2) return;
    if(draftStage !== 2) return;
    if(team1.bans.includes(specName) || team2.bans.includes(specName)) return;
    if(team1.name === teamName){
        if(team1.bans.length === 0 || (pickBanLimit.ban === 2 && team1.bans.length === 1 && team2.bans.length === 2) ) team1.bans.push(specName);
        else team1.picks.push(specName);
    }else{
        if(team2.bans.length === 0 || (pickBanLimit.ban === 2 && team1.bans.length === 1 && team1.picks.length === 2 && team2.picks.length === 2)) team2.bans.push(specName);
        else team2.picks.push(specName);
    }
    pickNBanTurnHandler(teamName);
    draftStageHandler();
}

/**
 * Updates the team squad.
 * @param {String Team Name} teamName 
 * @param {Squad Spec String Array} squad 
 */
function setSquadHandler(teamName,squad){
    if(!squad) return;
    if(squad.length < 10) return;
    const { team1, team2, draftStage } = raidLeagueMatch ?? {};
    if(!teamName || !team1 || !team2) return;
    if(draftStage !== 3) return;
    if(team1.name === teamName && team1.squad.length === 0) team1.squad = [...squad];
    else if(team2.name === teamName && team2.squad.length === 0) team2.squad = [...squad];
    draftStageHandler();
}

/**
 * Updates the team match submission log.
 * @param {String Team Name} teamName 
 * @param {Team submission URL log} log 
 */
function logHandler(teamName,log){
    if(!log) return;
    const { team1, team2 } = raidLeagueMatch ?? {};
    if(team1.name === teamName) team1.log = log;
    else team2.log = log;
    draftStageHandler();
}

/**
 * Updates the draft stage according to the fields.
 */
function draftStageHandler(){
    const {team1, team2 , draftStage } = raidLeagueMatch;
    switch(draftStage){
        case 1:{
            if(team1.draftReadyCheck && team2.draftReadyCheck) raidLeagueMatch.draftStage = 2;
            raidLeagueMatch.bosses = bossesDraft();
            return;
        }
        case 2:{
            if(team1.bans.length === pickBanLimit.ban && team2.bans.length === pickBanLimit.ban && 
                team1.picks.length === pickBanLimit.pick && team2.picks.length === pickBanLimit.pick) raidLeagueMatch.draftStage = 3;
            return;
        }
        case 3:{
            if(team1.squad.length === 10 && team2.squad.length === 10) raidLeagueMatch.draftStage = 4
            return;
        }
        case 4:{
            if(team1.matchReadyCheck && team2.matchReadyCheck) raidLeagueMatch.draftStage = 5;
            return;
        }
        case 5:{
            if(team1.log && team2.log) raidLeagueMatch.draftStage = 6;
            return;
        }
        default: return;
    }
}

module.exports = {readyCheckHandler , pickNBanTurnHandler , pickNBanHandler , setSquadHandler , logHandler };