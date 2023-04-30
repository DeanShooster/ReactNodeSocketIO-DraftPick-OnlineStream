import { SandClock } from "../../../../Images"

import './index.scss';

interface ICountDown{
    countDown: number;
}

export const CountDown = ({countDown} : ICountDown) => {
    return (
        <>
        {countDown > 0 ? 
            <div className='countdown'>
                <span>{countDown}</span>
                <img alt='' src={SandClock}/>
            </div> :
            <div className='fight'>FIGHT!</div>
        }
        </>
    )
}