
import { SquadComp } from './SquadComp';
import { BanAndBoss } from './BanAndBoss';

import './index.scss';

interface IFooterPanel{
    squadComp: {
        teamOne: string[],
        teamTwo: string[]
    };
    bans: {
        teamOne: string[],
        teamTwo: string[]
    };
    bosses: string[]
}

export const FooterPanel = ({squadComp,bans,bosses} : IFooterPanel) => {
    return (
        <div className='footer-panel-container'>
            <div className='panel'>
                <SquadComp teamOne={squadComp.teamOne} teamTwo={squadComp.teamTwo}/>
                <BanAndBoss bans={bans} bosses={bosses}/>
            </div>
        </div>
    );
}