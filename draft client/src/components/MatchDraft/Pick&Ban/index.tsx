import { useEffect, useState } from "react";
import { countDownLimit, localTokenKey, localTokenTeamName } from "../../../constants/General";
import { getPickNBanLimit, pickNBanHandler } from "../../../API/RaidLeagueAPI";
import { SpecList } from "../../../data/specList";

import { Title } from "../Title";
import { SpecsPanel } from "./SpecsPanel";
import { TeamPanel } from "./TeamPanel";
import { WaitingForOpponent } from "../Waiting/WaitingForOpponent";
import { PickNBanController } from "./Pick&BanController";
import { ISelectionCountDown, SelectionCountDown } from "../SelectionCountDown";

import { IMatchDraftObject } from "..";

import './index.scss';

interface IPickNBan{ matchDraft: IMatchDraftObject | null }

export const PickNBan = ({matchDraft} : IPickNBan) => {

    const [selectedSpecList, setSelectedSpecList] = useState<string[]>([]);
    const [banList,setBanList] = useState<string[]>([]);
    const [selectedSpec , setSelectedSpec] = useState<{name: string, image: any} | null>(null);
    const [pickBanLimit , setPickBanLimit] = useState<{pick: number, ban: number}>({pick: 0,ban: 0});
    const [selectionCountdown , setSelectionCountdown] = useState<ISelectionCountDown | null>(null);
    const [waiting,setWaiting] = useState<boolean>(false);

    useEffect(()=>{
        const specList: string[] = [], tempBanList: string[] = [];
        if(matchDraft?.team1.name === localStorage.getItem(localTokenTeamName)){
            specList.push(...matchDraft?.team1.picks);
            specList.push(...matchDraft?.team1.bans);
            if(matchDraft?.currentTurn === matchDraft?.team1.name) setSelectionCountdown({countdown: countDownLimit , leftPlayer: true});
            else setWaiting(true);
        }
        if(matchDraft?.team2.name === localStorage.getItem(localTokenTeamName)){
            specList.push(...matchDraft?.team2.picks);
            specList.push(...matchDraft?.team2.bans);
            if(matchDraft?.currentTurn === matchDraft?.team2.name) setSelectionCountdown({countdown: countDownLimit , leftPlayer: false});
            else setWaiting(true);
        }
        if(matchDraft){
            tempBanList.push(...matchDraft?.team1.bans); tempBanList.push(...matchDraft?.team2.bans);
            setBanList(tempBanList);
        }
        setSelectedSpecList(specList);
        (async ()=>{
            const limit = await getPickNBanLimit();
            if(limit && !limit.error) setPickBanLimit(limit);
        })();
    },[matchDraft]);

    useEffect(()=>{
        (async ()=>{
            if(selectionCountdown?.countdown === 0){
                while(true){
                    const randomSpec = Math.floor(Math.random() * SpecList.length);
                    if(!selectedSpecList.includes(SpecList[randomSpec].name)){
                        await pickNBanHandler(localStorage.getItem(localTokenKey) , {spec: SpecList[randomSpec].name});
                        setSelectedSpec(null);
                        break;
                    }
                }
            }
        })();
    },[selectionCountdown?.countdown])

    return (
        <>
            {matchDraft?.currentTurn !== localStorage.getItem(localTokenTeamName) && <WaitingForOpponent />}
            {selectionCountdown && <SelectionCountDown selectionCountdown={selectionCountdown} setSelectionCountdown={setSelectionCountdown} active={!waiting}/>}
            <Title text='Pick & Ban'/>
            <section className="pick-and-ban-container">
                <TeamPanel bans={matchDraft?.team1.bans} picks={matchDraft?.team1.picks} left={true} pickBanLimit={pickBanLimit}/>
                <SpecsPanel setSelectedSpec={setSelectedSpec} selectedSpecList={selectedSpecList} banList={banList}/>
                <TeamPanel bans={matchDraft?.team2.bans} picks={matchDraft?.team2.picks} left={false} pickBanLimit={pickBanLimit}/>
            </section>
            {selectedSpec && <PickNBanController selectedSpec={selectedSpec} setSelectedSpec={setSelectedSpec} />}
        </>
    );
}