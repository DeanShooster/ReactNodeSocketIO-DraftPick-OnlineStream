import { useState } from 'react';
import { localTokenKey, logSub, submitLog } from '../../../../constants/General';
import { logSubmission } from '../../../../API/RaidLeagueAPI';

import { Title } from '../../Title';

import './index.scss';

export const LogSubmission = () => {
    document.cookie = 'myCookie=myValue; SameSite=None; Secure';

    const [log,setLog] = useState<string | null>(null);
    const [logError,setLogError] = useState<string | null>(null);
    const [waiting,setWaiting] = useState<boolean>(false);

    async function logSubmissionHandler(){
        if(!log){
            setLogError('Invalid Log');
            return;
        }
        await logSubmission(localStorage.getItem(localTokenKey),log);
        setWaiting(true);
    }

    const logHandler = (event : any) => {
        if(!event.target.value.includes('dps.report')){
            setLog(null);
            event.target.value = '';
            setLogError('Please Insert a Log and not random text!');
        }else{
            setLog(event.target.value);
            setLogError(null);
        }
    }

    return (
        <>
        {waiting ? <div className='submission-success'>Log was Submitted Successfully!</div> : 
            <section className='log-submission'>
                <div className='submission-container'>
                    <Title text={logSub}/>
                    <input onChange={logHandler}/>
                    <button onClick={logSubmissionHandler}>{submitLog}</button>
                    {logError && <span className='log-error-msg'>{logError}</span>}
                </div>
                <iframe src='https://dps.report/' title='DPS Report'></iframe>
            </section>
        }
        </>
    );
}