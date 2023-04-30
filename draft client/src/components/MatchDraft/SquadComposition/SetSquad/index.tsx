import { useState } from "react";
import { squadHandler } from "../../../../API/RaidLeagueAPI";
import { localTokenKey } from "../../../../constants/General";
import { ISpecList } from "../../../../data/specList";

import './index.scss';

interface ISetSquad{
    squad: ISpecList[];
    opponentPicks: string[];
    setWaiting: Function;
}

export const SetSquad = ({squad,opponentPicks,setWaiting}: ISetSquad) => {

    const [pickError,setPickError] = useState<boolean>(false);

    async function setSquadHandler(){
        const finalSquad: string[] = [];
        squad.map((spec:ISpecList)=>{ return finalSquad.push(spec.name) });
        if(opponentPicks.length === countDiffStrings(finalSquad)){
            await squadHandler(localStorage.getItem(localTokenKey),finalSquad);
            setPickError(false); setWaiting(true);
        }else setPickError(true);
    }

    // Counting Unique strings in an array.
    function countDiffStrings(arr : string[]){
        const stringCount: any = {};
        arr.forEach((string) => {
            if (string in stringCount) stringCount[string]++;
            else stringCount[string] = 1;
          });
          return Object.keys(stringCount).length;
    }

    return (
        <>
            <button className="setSquadButton" onClick={setSquadHandler}>Set Squad!</button>
            {pickError && <div className="pick-error-msg">You must use all your picks!</div>}
        </>
    );
}