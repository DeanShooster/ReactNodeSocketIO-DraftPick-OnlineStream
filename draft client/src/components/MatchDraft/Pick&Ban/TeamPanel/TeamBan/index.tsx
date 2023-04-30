import { ISpecList, SpecList } from "../../../../../data/specList";

import './index.scss';
import { Ban, EmptyPickBan } from "../../../../../Images";

interface ITeamBan{
    banName: string | null | undefined;
}

export const TeamBan = ({banName} : ITeamBan) => {

    const pickNameImage = SpecList.find( (spec: ISpecList)=> spec.name === banName )?.image;

    return (
        <div className='ban'>
            <img alt='' src={banName ? pickNameImage : EmptyPickBan} className={`ban-icon ${banName ? 'banned-icon' : 'empty-icon'}`}/>
            <div className='ban-title'>
                <span>Ban</span>
                <img alt='' src={Ban}/>
            </div>
        </div>
    );
}