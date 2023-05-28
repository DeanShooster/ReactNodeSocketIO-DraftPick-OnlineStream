
import { ITeam } from '..';
import { TeamsController } from './TeamsController';

import './index.scss';

interface ITeams{
    teams: ITeam[];
    updateSetting: Function;
}

export const Teams = ({teams,updateSetting}: ITeams) => {
    return (
        <section className='teams-container'>
            <h1>Teams</h1>
            <TeamsController teams={teams} updateSetting={updateSetting}/>
        </section>
    );
}