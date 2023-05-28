
import { SpecPick } from './SpecPick';

import './index.scss';

interface ITeamPicks{
    left: boolean;
    picks: string[];
    pickLimit: number;
}

export const TeamPicks = ({left,picks , pickLimit} : ITeamPicks) =>{

    const specPicks = [];
    for(let i = 0; i < pickLimit ; i++) specPicks.push(<SpecPick key={i} left={left} pick={(picks.length > i ? picks[i] : undefined)}/>);

    return (
        <div className='team-picks-container'>
            {specPicks}
        </div>
    );
}