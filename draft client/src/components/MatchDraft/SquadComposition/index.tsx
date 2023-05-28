import { useEffect, useState } from 'react';
import { ISpecList } from '../../../data/specList';
import { countDownLimit, localTokenKey, localTokenTeamName } from '../../../constants/General';

import { BuildSpecList } from './SpecList';
import { Squad } from './Squad';
import { SetSquad } from './SetSquad';
import { ISelectionCountDown, SelectionCountDown } from '../SelectionCountDown';
import { WaitingForOpponent } from '../Waiting/WaitingForOpponent';

import { IMatchDraftObject } from '..';

import './index.scss';
import { squadHandler } from '../../../API/RaidLeagueAPI';
import { Title } from '../Title';

interface ISquadComposition{
    matchDraft: IMatchDraftObject | null
}

export const SquadComposition = ({matchDraft}:ISquadComposition) => {

    const [selectionCountdown , setSelectionCountdown] = useState<ISelectionCountDown | null>(null);
    const [opponentPicks,setOpponentPicks] = useState<string[]>([]);
    const [squad,setSquad] = useState<ISpecList[]>(new Array(10).fill({ name: '', image: null }));
    const [dragging,setDragging] = useState<any>(null);
    const [waiting,setWaiting] = useState<boolean>(false);

    useEffect(()=>{
        const specList: string[] = [];
        if(matchDraft?.team1.name === localStorage.getItem(localTokenTeamName)){
            specList.push(...matchDraft?.team1.picks);
            if(matchDraft.team1.squad.length === 10) setWaiting(true);
            setSelectionCountdown({countdown: countDownLimit , leftPlayer: true});
        }
        if(matchDraft?.team2.name === localStorage.getItem(localTokenTeamName)){
            specList.push(...matchDraft?.team2.picks);
            if(matchDraft.team2.squad.length === 10) setWaiting(true);
            setSelectionCountdown({countdown: countDownLimit , leftPlayer: false});
        }
        setOpponentPicks(specList);
    },[matchDraft]);

    // useEffect(()=>{
    //     (async ()=>{
    //         if(selectionCountdown?.countdown === 0){
    //             const randomSquad: string[] = [];
    //             while(randomSquad.length < 10){
    //                 for(let i = 0; i < opponentPicks.length; i ++)
    //                     randomSquad.push(opponentPicks[i]);
    //             }
    //             await squadHandler(localStorage.getItem(localTokenKey),randomSquad);
    //             setWaiting(true);
    //         }
    //     })();
    // },[selectionCountdown,opponentPicks])

    const handleDragStart = (event: any, spec: ISpecList)=> setDragging(spec);
    const handleDragOver = (event: any) => event.preventDefault();
    const handleDragDrop = (event: any) => {
        event.preventDefault();
        const index = event.target.dataset.index;
        if(squad[index]?.name === ''){
            const updatedSquad = [...squad];
            updatedSquad[index] = {
                name: dragging.name,
                image: dragging.image
            }
            setSquad(updatedSquad);
        }
        setDragging(null);
    }

    return (
        <>
            {/* {selectionCountdown && <SelectionCountDown selectionCountdown={selectionCountdown} setSelectionCountdown={setSelectionCountdown} active={!waiting}/>} */}
            {waiting && <WaitingForOpponent />}
            <section className='squad-composition-container'>
                <Title text='Build Your Squad'/>
                <Squad squad={squad} setSquad={setSquad} handleDragOver={handleDragOver} handleDragDrop={handleDragDrop}/>
                <BuildSpecList handleDragStart={handleDragStart} opponentPicks={opponentPicks}/>
            </section>
            {!squad.some((spec: ISpecList)=> spec.name === '') && <SetSquad squad={squad} opponentPicks={opponentPicks} setWaiting={setWaiting}/>}
        </>
    );
}