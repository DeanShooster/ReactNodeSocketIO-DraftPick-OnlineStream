
import './index.scss';

interface ITeam{
    left: boolean;
    name: string | null | undefined;
}

export const Team = ({left , name} : ITeam) => {
    const style = { transform: left ? 'skew(10deg)' : 'skew(-10deg)', background: left ? '#0a4264' : '#be2038' }
    return (
        <div className={`team-container ${name ? 'updated-team' : ''}`} style={style} >
            <span>{name || 'Waiting...'}</span>
        </div>
    );
}