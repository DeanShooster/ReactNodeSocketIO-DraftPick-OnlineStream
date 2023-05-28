
import { ITeam } from '..';
import { CurrentMatch } from './CurrentMatch';
import { Controller } from './Controller';

import './index.scss';

interface IMatch{
    match: ITeam[];
    teams: ITeam[];
    updateSetting: Function;
}

export const Match = ({match,teams,updateSetting}: IMatch) => {
    return (
        <section className='match-container'>
            <h1>Match</h1>
            <CurrentMatch match={match}/>
            <hr/>
            <Controller match={match} teams={teams} updateSetting={updateSetting}/>
        </section>
    );
}