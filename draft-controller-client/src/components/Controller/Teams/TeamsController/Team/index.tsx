
import './index.scss';

interface ITeam{
    name: string;
    code: string;
}

export const Team = ({name,code} : ITeam) => {
    return (
        <div className='team'>
            <h3>{name}</h3>
            <p>{code}</p>
        </div>
    );
}