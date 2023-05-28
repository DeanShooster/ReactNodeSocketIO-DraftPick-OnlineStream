
import './index.scss';

interface IData{
    pick: number;
    ban: number;
}

export const Data = ({pick,ban}: IData) => {
    return (
        <div className='data'>
            <h2>Current Settings</h2>
            <p>{pick} Picks</p>
            <p>{ban} Bans</p>
        </div>
    );
}