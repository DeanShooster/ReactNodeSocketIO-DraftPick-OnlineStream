
import './index.scss';
import { SandClock } from '../../../../Images';

export const NoOpponents = () => {
    return (
        <div className='waiting-for-opponents'>
            <span>Waiting For Opponents</span>
            <img alt='' src={SandClock}/>
        </div>
    );
}