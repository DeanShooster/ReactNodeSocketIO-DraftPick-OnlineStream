import { useEffect, useState } from 'react';
import { Socket , io } from 'socket.io-client';
import { connection, matchState } from '../../constants/General';
import { serverEmitter } from '../../constants/API';
import { getPickNBanLimit } from '../../API/RaidLeagueStreamDraftAPI';

import { Header } from './Header';
import { TeamPicks } from './TeamPicks';
import { FooterPanel } from './FooterPanel';

import './index.scss';

export interface IMatchDraftObject{ team1: ITeamDraft, team2: ITeamDraft , draftStage: number, currentTurn: string | null , bosses: string[]  }
export interface ITeamDraft{
  name: string | null,
  draftReadyCheck: boolean,
  bans: string[],
  picks: string[],
  squad: string[],
  matchReadyCheck: boolean,
  matchResults: boolean[]
}
export interface IPickBanLimit{
    banLimit: number;
    pickLimit: number;
}

export const DraftStream = () => {

    const [socket,setSocket] = useState<Socket | null>(null);
    const [matchDraft , setMatchDraft] = useState<IMatchDraftObject | null>(null);
    const [pickBanLimits , setPickBanLimits] = useState<IPickBanLimit | null>(null);

    useEffect(()=>{
        const connectionSocket : Socket = io(serverEmitter);
        setSocket(connectionSocket);
      },[])

    useEffect(()=>{
        socket?.on(connection, ()=> console.log("Successfully connected " + socket.id));
        socket?.on(matchState, (data: any) => setMatchDraft(data));
        return () => { socket?.disconnect(); }
    },[socket])

    useEffect(()=>{
        (async () => {
            const result = await getPickNBanLimit();
            if(!result.error) setPickBanLimits({banLimit: result.ban , pickLimit: result.pick});
        })();
    },[])

    return (
        <>
            {matchDraft && 
            <>
                <Header teamOneName={matchDraft.team1.name} teamTwoName={matchDraft.team2.name} teamOneWins={matchDraft.team1.matchResults} teamTwoWins={matchDraft.team2.matchResults}/>
                <section className='picks-and-panel-container'>
                    <TeamPicks left={true} picks={matchDraft.team1.picks} pickLimit={pickBanLimits?.pickLimit || 0}/>
                    <FooterPanel squadComp={{teamOne: matchDraft.team1.squad , teamTwo: matchDraft.team2.squad}}
                                bans={{teamOne: matchDraft.team1.bans , teamTwo: matchDraft.team2.bans}} bosses={matchDraft.bosses} />
                    <TeamPicks left={false} picks={matchDraft.team2.picks} pickLimit={pickBanLimits?.pickLimit || 0}/>
                </section>
            </>
            }
        </>
    );
}