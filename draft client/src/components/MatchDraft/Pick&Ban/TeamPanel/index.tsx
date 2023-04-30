
import { TeamBan } from './TeamBan';
import { TeamPick } from './TeamPick';

import './index.scss';

interface ITeamPanel{
    left: boolean;
    bans: string[] | undefined;
    picks: string[] | undefined;
    pickBanLimit: {
        pick: number;
        ban: number;
    }
}

export const TeamPanel = ({left,bans,picks,pickBanLimit} : ITeamPanel) => {

    const pickList = [], banList = [];
    for(let i = 0; i < pickBanLimit.pick ; i++) 
        pickList.push(<TeamPick key={i} pickName={picks ? picks[i] : null}/>)
    for(let i = 0; i < pickBanLimit.ban ; i++)
        banList.push(<TeamBan key={i} banName={bans ? bans[i] : null}/>)

    return (
        <>
            <div className={`team-pick-panel ${left ? 'left-pick' : 'right-pick'}`}>
                {pickList}
            </div>
            <div className={`team-ban-panel ${left ? 'left-ban' : 'right-ban'}`}>
                {banList}
            </div>
        </>
    );
}