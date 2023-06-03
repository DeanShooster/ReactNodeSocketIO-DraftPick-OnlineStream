
import { findSpecLogo } from '../../../../utils/findSpec';

import './index.scss';
import { GoldBorder } from './GoldBorder';
import { RaidLeagueLogo, noBoss } from '../../../../Images';

interface ISquadComp{
    teamOne: string[],
    teamTwo: string[]
}

export const SquadComp = ({teamOne,teamTwo} : ISquadComp) => {

    const noSquad = [];
    for(let i = 0; i < 10 ; i ++) noSquad.push(<img key={i} src={noBoss}/>)

    return (
        <div className='squad-comp-container'>
            <GoldBorder />
            <div className='squad'>
                {teamOne.length > 0 ? teamOne.map( (spec,index)=>{ return <img key={index} alt='' className='chosen-comp-spec' src={findSpecLogo(spec)}/>}) : noSquad }
            </div>
            <img alt='' src={RaidLeagueLogo} className='logo'/>
            <div className='squad'>
                {teamTwo.length > 0 ? teamTwo.map( (spec,index)=>{ return <img key={index} alt='' className='chosen-comp-spec' src={findSpecLogo(spec)}/>}) : noSquad}
            </div>
        </div>
    );
}