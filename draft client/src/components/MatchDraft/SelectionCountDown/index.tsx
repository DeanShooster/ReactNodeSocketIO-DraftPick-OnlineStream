import { useEffect, useRef } from 'react';

import './index.scss';
const thirtySecSound = require('../../../audio/30sec left.mp3');
const tenSecSound = require('../../../audio/10sec left.mp3');
const fiveSecCountdownSound = require('../../../audio/5sec countdown.mp3');

export interface ISelectionCountDown{
    countdown: number;
    leftPlayer: boolean;
}

interface ISelectionCountDownProps{
    selectionCountdown: ISelectionCountDown;
    setSelectionCountdown: Function;
    active: boolean;
}

export const SelectionCountDown = ({selectionCountdown,setSelectionCountdown,active} : ISelectionCountDownProps) => {

    const thirtySec = useRef<any>(null);
    const tenSec = useRef<any>(null);
    const fiveSecCountdown = useRef<any>(null);

    useEffect(()=>{
        if(selectionCountdown.countdown > 0 && active)
            setTimeout(() => setSelectionCountdown({countdown: selectionCountdown.countdown - 1, leftPlayer: selectionCountdown.leftPlayer}), 1000)
        if(thirtySec && selectionCountdown.countdown === 30) thirtySec.current.play();
        if(tenSec && selectionCountdown.countdown === 10) tenSec.current.play();
        if(fiveSecCountdown && selectionCountdown.countdown === 5 && active) fiveSecCountdown.current.play();
    },[selectionCountdown,setSelectionCountdown,active]);

    return (
        <>
            <audio ref={thirtySec}>
                <source src={thirtySecSound} type='audio/mpeg'/>
                Your browser does not support the audio element.
            </audio>
            <audio ref={tenSec}>
                <source src={tenSecSound} type='audio/mpeg'/>
                Your browser does not support the audio element.
            </audio>
            <audio ref={fiveSecCountdown}>
                <source src={fiveSecCountdownSound} type='audio/mpeg'/>
                Your browser does not support the audio element.
            </audio>
            <div className={`selection-countdown ${selectionCountdown.countdown < 10 && selectionCountdown.countdown > 0 ? 'warning-countdown' : ''} 
                            ${selectionCountdown.leftPlayer ? 'left-player-counter' : 'right-player-counter'}`}>
                {selectionCountdown.countdown}
            </div>
        </>
    );
}