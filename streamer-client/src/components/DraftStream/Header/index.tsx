
import { ScoreBoard } from './ScoreBoard';

import './index.scss';
import { GoldLine } from '../../../Images';

interface IHeader{
    teamOneName: string | null | undefined;
    teamTwoName: string | null | undefined;
    teamOneWins: boolean[];
    teamTwoWins: boolean[];
}

export const Header = ({teamOneName,teamTwoName,teamOneWins,teamTwoWins} : IHeader) => {

    const noTeam = 'Waiting...';

    return (
        <header className='header'>
            <div>{teamOneName || noTeam}</div>
            <ScoreBoard teamOneWins={teamOneWins} teamTwoWins={teamTwoWins}/>
            <div>{teamTwoName || noTeam}</div>
            <img alt='' src={GoldLine} className='gold-line'/>
        </header>
    );
}