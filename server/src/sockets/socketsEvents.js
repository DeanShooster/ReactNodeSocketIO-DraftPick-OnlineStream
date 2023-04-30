const { connection, match, matchObChange } = require('../constants/emitters');
const {raidLeagueMatch} = require('../data/matchData');
const EventEmitter = require('events');

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

function handleConnection(io){
    io.on(connection, (socket) => {
        io.sockets.emit(match,raidLeagueMatch);

        emitter.on(matchObChange, ()=>{
            io.sockets.emit(match,raidLeagueMatch);
        });
    });
}

module.exports = {handleConnection , emitter};