import { endMatch } from '../../../constants/General';

import './index.scss';

export const EndOfMatch = () => {
    return (
        <div className='end-of-match'>
            <span>{endMatch.gg}</span>
            <span>{endMatch.adminRest}</span>
        </div>
    );
}