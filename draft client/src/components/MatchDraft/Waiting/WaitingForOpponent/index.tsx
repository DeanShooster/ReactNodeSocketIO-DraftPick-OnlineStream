import { WaitingOpponent } from '../../../../constants/General';

import './index.scss';

export const WaitingForOpponent = () => {
    return (
        <div className='waiting-for-opponent'>
            <div className='waiting-for-opponent-text'>
                <span>{WaitingOpponent}</span>
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>
        </div>
    );
}