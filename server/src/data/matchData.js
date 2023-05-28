
/**
 * Number of picks and bans for a single match.
 * picks 2~6
 * bans 0~2
 */
const pickBanLimit = {
    pick: 5,
    ban: 2,
    pickRange:{
        min: 2,
        max: 6
    },
    banRange:{
        min: 0,
        max: 2
    }
}

/**
 * Draft Stage
 * 1 - Ready Check before pick and ban.
 * 2 - Pick and Ban
 * 3 - Squad set up.
 * 4 - Ready Check before match.
 * 5 - Match
 * 6 - Logs
 */
const raidLeagueMatch = {
    team1: {
        name: null,
        draftReadyCheck: false,
        bans: [],
        picks: [],
        squad: [],
        matchReadyCheck: false,
        log: null,
        matchResults: []
    },
    team2: {
        name: null,
        draftReadyCheck: false,
        bans: [],
        picks: [],
        squad: [],
        matchReadyCheck: false,
        log: null,
        matchResults: []
    },
    draftStage: 1,
    currentTurn: null,
    pickNBanTurns: 1,
    round: 1,
    bosses: [null,null,null,null,null]
};

module.exports = { raidLeagueMatch , pickBanLimit };