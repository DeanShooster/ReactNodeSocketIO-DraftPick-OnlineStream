
import { findSpecLogo } from '../../../../utils/findSpec';
import { findBoss } from '../../../../utils/findBoss';

import './index.scss';
import { Bosses, LeftBans, RightBans, noBoss } from '../../../../Images';

interface IBanAndBoss{
    bans: {
        teamOne: string[],
        teamTwo: string[]
    },
    bosses: string[]
}

export const BanAndBoss = ({bans,bosses} : IBanAndBoss) => {

    const fakeTeams = ['bla','bla',null,null,null];

    return (
        <div className='ban-boss-container'>
            <div className='bans'>
                <img alt='' src={LeftBans} className='bg-ban-img'/>
                <div className='banned-specs-left'>
                    {bans.teamOne.map((spec,index)=>{ return <img key={index} alt='' src={findSpecLogo(spec)} className='banned-spec'/>})}
                </div>
            </div>
            <div className='boss-container'>
                <img alt='' src={Bosses} className='bosses-bg-img'/>
                <div className='bosses-list'>
                    {fakeTeams.map((team,index)=>{ return <img key={index} alt='' src={team ? noBoss : undefined} className='team-logo-img'/>})}
                    {bosses.map((boss,index)=>{ 
                        return <img key={index} alt='' src={findBoss(boss).image} className={`boss-img ${findBoss(boss).name !== 'no-boss' ? 'boss-chosen' : undefined}`}/> 
                    })}
                </div>
            </div>
            <div className='bans'>
                <img alt='' src={RightBans} className='bg-ban-img'/>
                <div className='banned-specs-right'>
                    {bans.teamTwo.map((spec,index)=>{ return <img key={index} alt='' src={findSpecLogo(spec)} className='banned-spec'/>})}
                </div>
            </div>
        </div>
    );
}