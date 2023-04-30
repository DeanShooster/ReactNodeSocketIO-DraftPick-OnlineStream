import { useEffect, useRef, useState } from 'react';
import { countDownLimit } from '../../../constants/General';

import { CountDown } from './CountDown';
import { LogSubmission } from './LogSubmission';

const countdownSound = require('../../../audio/countdown.mp3');
const fightSound = require('../../../audio/fight.mp3');

export const Match = () => {

    const [countDown , setCountDown] = useState<number>(countDownLimit);
    const countdownRef = useRef<any>(null);
    const fightRef = useRef<any>(null);

    useEffect(()=>{
        if(countDown > -10) setTimeout(() => setCountDown(countDown - 1), 1000)
        if(countdownRef) countdownRef.current.play();
        if(fightRef && countDown === 0) fightRef.current.play();
        else fightRef.current.pause();
        if(countDown < -5) countdownRef.current.pause();
    },[countDown])

    return (
        <>
            <audio ref={countdownRef}>
                <source src={countdownSound} type='audio/mpeg'/>
                Your browser does not support the audio element.
            </audio>
            <audio ref={fightRef}>
                <source src={fightSound} type='audio/mpeg'/>
                Your browser does not support the audio element.
            </audio>
            {countDown > -10 && <CountDown countDown={countDown}/>}
            {countDown === -10 && <LogSubmission />}
        </>
    );
}