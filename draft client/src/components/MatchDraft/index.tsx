import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { connection, matchState } from "../../constants/General";
import { serverEmitter } from "../../constants/API";

import { Header } from "./Header";
import { PickNBan } from "./Pick&Ban";
import { SquadComposition } from "./SquadComposition";
import { ReadyCheck } from "./ReadyCheck";
import { NoOpponents } from "./Waiting/NoOpponents";
import { MatchStart } from "./MatchStart";
import { Match } from "./Match";
import { EndOfMatch } from "./EndOfMatch";

const background = require('../../audio/background.mp3');

export interface IMatchDraftObject{ team1: ITeamDraft, team2: ITeamDraft , draftStage: number, currentTurn: string | null }
export interface ITeamDraft{
  name: string | null,
  draftReadyCheck: boolean,
  bans: string[],
  picks: string[],
  squad: string[],
  matchReadyCheck: boolean
}

export const MatchDraft = () => {

    const [socket,setSocket] = useState<Socket | null>(null);
    const [matchDraft , setMatchDraft] = useState<IMatchDraftObject | null>(null);
    const backgroundSound = useRef<any>(null);

    useEffect(()=>{
        const connectionSocket : Socket = io(serverEmitter);
        setSocket(connectionSocket);
        if(backgroundSound){
            backgroundSound.current.play();
            backgroundSound.current.volume = 0.05;
        }
      },[])

    // Socket Connection
    useEffect(() => {
        socket?.on(connection, ()=> console.log("Successfully connected " + socket.id));
        socket?.on(matchState, (data: any) => setMatchDraft(data) );
        return () => { socket?.disconnect(); }
    }, [socket]);

    return (
        <>
            <audio ref={backgroundSound} loop>
                <source src={background} type='audio/mpeg'/>
                Your browser does not support the audio element.
            </audio>
            <Header matchDraft={matchDraft}/>
            {(matchDraft?.draftStage === 1 && matchDraft?.team1.name && matchDraft?.team2.name) ? <ReadyCheck /> : (matchDraft?.draftStage === 1 && <NoOpponents />)}
            {matchDraft?.draftStage === 2 && <PickNBan matchDraft={matchDraft}/>}
            {matchDraft?.draftStage === 3 && <SquadComposition matchDraft={matchDraft}/>}
            {matchDraft?.draftStage === 4 && <MatchStart />}
            {matchDraft?.draftStage === 5 && <Match />}
            {matchDraft?.draftStage === 6 && <EndOfMatch />}
        </>
    );
}