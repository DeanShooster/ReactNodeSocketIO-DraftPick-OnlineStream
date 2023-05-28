import { useEffect, useState } from "react";
import { ban, localTokenTeamName, pick } from "../../../constants/General";
import { getPickNBanLimit } from "../../../API/RaidLeagueAPI";

import { Title } from "../Title";
import { SpecsPanel } from "./SpecsPanel";
import { TeamPanel } from "./TeamPanel";
import { WaitingForOpponent } from "../Waiting/WaitingForOpponent";
import { PickNBanController } from "./Pick&BanController";

import { IMatchDraftObject } from "..";
import { pickOrBanHandler } from "../../../utils/pickOrBanHandler";

import './index.scss';

interface IPickNBan{ matchDraft: IMatchDraftObject | null }

export const PickNBan = ({matchDraft} : IPickNBan) => {

    const [selectedSpecList, setSelectedSpecList] = useState<string[]>([]);
    const [banList,setBanList] = useState<string[]>([]);
    const [selectedSpec , setSelectedSpec] = useState<{name: string, image: any} | null>(null);
    const [pickBanLimit , setPickBanLimit] = useState<{pick: number, ban: number}>({pick: 0,ban: 0});
    const [pickOrBan , setPickOrBan] = useState<string | null>(null);

    useEffect(()=>{
        const specList: string[] = [], tempBanList: string[] = [];
        if(matchDraft?.team1.name === localStorage.getItem(localTokenTeamName)){
            specList.push(...matchDraft?.team1.picks);
            specList.push(...matchDraft?.team1.bans);
            setPickOrBan(pickOrBanHandler(matchDraft?.team1.picks.length ,matchDraft?.team1.bans.length));
        }
        if(matchDraft?.team2.name === localStorage.getItem(localTokenTeamName)){
            specList.push(...matchDraft?.team2.picks);
            specList.push(...matchDraft?.team2.bans);
            setPickOrBan(pickOrBanHandler(matchDraft?.team2.picks.length ,matchDraft?.team2.bans.length));
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

    return (
        <>
            {matchDraft?.currentTurn !== localStorage.getItem(localTokenTeamName) && <WaitingForOpponent />}
            <Title text={pickOrBan || ''}/>
            <section className="pick-and-ban-container">
                <TeamPanel bans={matchDraft?.team1.bans} picks={matchDraft?.team1.picks} left={true} pickBanLimit={pickBanLimit}/>
                <SpecsPanel setSelectedSpec={setSelectedSpec} selectedSpecList={selectedSpecList} banList={banList}/>
                <TeamPanel bans={matchDraft?.team2.bans} picks={matchDraft?.team2.picks} left={false} pickBanLimit={pickBanLimit}/>
            </section>
            {selectedSpec && <PickNBanController selectedSpec={selectedSpec} setSelectedSpec={setSelectedSpec} />}
        </>
    );
}