
import { findSpecLogo } from '../../../../utils/findSpec';

import './index.scss';
import { GoldBorder } from './GoldBorder';
import { RaidLeagueLogo } from '../../../../Images';

interface ISquadComp{
    teamOne: string[],
    teamTwo: string[]
}

export const SquadComp = ({teamOne,teamTwo} : ISquadComp) => {
    return (
        <div className='squad-comp-container'>
            <GoldBorder />
            <div className='squad'>
                {teamOne.map( (spec,index)=>{ return <img key={index} alt='' src={findSpecLogo(spec)}/>})}
            </div>
            <img alt='' src={RaidLeagueLogo} className='logo'/>
            <div className='squad'>
                {teamTwo.map( (spec,index)=>{ return <img key={index} alt='' src={findSpecLogo(spec)}/>})}
            </div>
        </div>
    );
}