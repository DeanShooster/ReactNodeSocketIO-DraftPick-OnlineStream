
import './index.scss';
import { FilledGoldBar, GoldBar,  ScoreBoardHeader, noBoss } from '../../../../Images';

interface IScoreBoard{
    teamOneWins: boolean[];
    teamTwoWins: boolean[];
}

export const ScoreBoard = ({teamOneWins,teamTwoWins} : IScoreBoard) => {

    const teamOneMatchResults = [], teamTwoMatchResults = [];
    for(let i = 0; i < 3 ; i++){
        teamOneMatchResults.push(<img key={i} alt='' src={teamOneWins[i] ? FilledGoldBar : GoldBar} className={teamOneWins[i] ? 'win-animation' : ''}/>)
        teamTwoMatchResults.push(<img key={i} alt='' src={teamTwoWins[i] ? FilledGoldBar : GoldBar} className={teamTwoWins[i] ? 'win-animation' : ''}/>)
    } 


    return (
        <div className='scoreboard'>
            <img alt='' src={ScoreBoardHeader} className='board'/>
            <div className='general-match-info'>
                <div className='team-match-info'>
                    <p>R: ??</p>
                    <img alt='' src={noBoss} className='team-logo'/>
                    <div className='win-lose-info'>
                         {teamOneMatchResults}
                    </div>
                </div>
                <div className='team-match-info'>
                    <div className='win-lose-info'>
                        {teamTwoMatchResults}
                    </div>
                    <img alt='' src={noBoss} className='team-logo'/>
                    <p>R: ??</p>
                </div>
            </div>
        </div>
    )
}