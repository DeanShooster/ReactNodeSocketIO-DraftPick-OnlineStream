import { useState } from 'react';
import { readyCheck } from '../../../API/RaidLeagueAPI';
import { localTokenKey } from '../../../constants/General';

import { WaitingForOpponent } from '../Waiting/WaitingForOpponent';

import './index.scss';
import { ArrowDown } from '../../../Images';

interface IReadyCheck{
    fight?: boolean;
}

export const ReadyCheck = ({fight}:IReadyCheck) => {

    const [ready,setReady] = useState<boolean>(false);

    async function readyCheckHandler(){
        setReady(true);
        await readyCheck(localStorage.getItem(localTokenKey));
    }

    return (
        <>
            {ready ? <WaitingForOpponent /> : <>
                <div className='ready-check-user-info'>
                    <span>{fight ? 'Ready to Fight?' : 'If you are ready press...'}</span>
                    <img alt='' src={ArrowDown}/>
                </div>
                <button className='ready-check-button' onClick={readyCheckHandler}>Ready Check</button> 
            </>
            }
        </>
    );
}