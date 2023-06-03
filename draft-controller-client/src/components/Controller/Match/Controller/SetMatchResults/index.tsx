import { useState } from 'react';
import { ITeam } from '../../..';
import { setMatchWinner } from '../../../../../API/ControllerAPI';
import { errorMsg, localTokenAdminKey, updateMsg } from '../../../../../constants/General';

import './index.scss';
import { ModalUpdate } from '../../../../ModalUpdate';

interface ISetMatchResults{
    teams: ITeam[];
}

export const SetMatchResults = ({teams} : ISetMatchResults) => {

    const [winner,setWinner] = useState<{name: string}>({name : teams[0]?.name});
    const [modalMsg,setModalMsg] = useState<string | null>(null);

    const teamOptions = [];
    for(let i = 0; i < teams.length; i++) teamOptions.push(<option key={i}>{teams[i]?.name}</option>);

    async function submitWinnerHandler(event: any){
        event.preventDefault();
        const result = await setMatchWinner(localStorage.getItem(localTokenAdminKey) || '', winner);
        if(result.error){
            setModalMsg(errorMsg);
            return;
        }
        setModalMsg(updateMsg);
    }

    return (
        <>
            <div className='match-results'>
                <h2>Set a Winner:</h2>
                <form onSubmit={submitWinnerHandler}>
                    <select onChange={(event: any)=>setWinner(event.target.value)}>
                        {teamOptions}
                    </select>
                    <button>SET</button>
                </form>
            </div>
            {modalMsg && <ModalUpdate update={modalMsg} closeModal={setModalMsg}/>}
        </>
    );
}