import { useState } from 'react';
import { resetMatch, setNextMatch } from '../../../../../API/ControllerAPI';
import { errorMsg, localTokenAdminKey, updateMsg } from '../../../../../constants/General';

import { ITeam } from '../../..';

import './index.scss';
import { VersusIcon } from '../../../../../Images';
import { ModalUpdate } from '../../../../ModalUpdate';

interface INextMatch{
    teams: ITeam[];
    updateSetting: Function;
}

interface ITeamSelection{
    team1: string | null;
    team2: string | null;
}

export const NextMatch = ({teams,updateSetting}:INextMatch) => {

    const [teamSelection,setTeamSelection] = useState<ITeamSelection>({team1: teams[0]?.name , team2: teams[0]?.name});
    const [errorSelect,setErrorSelect] = useState<string | null>(null);
    const [modalMsg,setModalMsg] = useState<string | null>(null);

    const teamOptions = [];
    for(let i = 0; i < teams.length; i++) teamOptions.push(<option key={i}>{teams[i].name}</option>)

    async function setMatchHandler(event: any){
        event.preventDefault();
        if(teamSelection.team1 === teamSelection.team2){ setErrorSelect('Team cannot fight itself...'); return; }
        if(!teamSelection.team1 || !teamSelection.team2) {setErrorSelect('Must choose a team...'); return;}
        setErrorSelect(null);
        await resetMatch(localStorage.getItem(localTokenAdminKey) || '');
        const result = await setNextMatch(localStorage.getItem(localTokenAdminKey) || '',teamSelection);
        if(result.error){
            setModalMsg(errorMsg);
            return;
        }
        setModalMsg(updateMsg);
        updateSetting();
    }

    return (
        <>
            <div className='next-match'>
                <h2>Set up Next Match</h2>
                <form onSubmit={setMatchHandler}>
                    <div>
                        <h3>First Team</h3>
                        <select onChange={(event: any)=>setTeamSelection({...teamSelection,team1: event.target.value})}>
                            {teamOptions}
                        </select>
                    </div>
                    <img alt='' src={VersusIcon}/>
                    <div>
                        <h3>Second Team</h3>
                        <select onChange={(event: any)=>setTeamSelection({...teamSelection,team2: event.target.value})}>
                            {teamOptions}
                        </select>
                    </div>
                    {errorSelect && <div style={{width: '100%'}}>{errorSelect}</div>}
                    <button>Start Match</button>
                </form>
            </div>
            {modalMsg && <ModalUpdate update={modalMsg} closeModal={setModalMsg}/>}
        </>
    );
}