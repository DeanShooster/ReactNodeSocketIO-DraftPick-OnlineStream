import { SpecList, ISpecList } from '../../../../../data/specList';

import './index.scss';
import {EmptyPickBan, Pick } from '../../../../../Images';

interface ITeamPick{
    pickName: string | null | undefined;
}

export const TeamPick = ({pickName} : ITeamPick) => {

    const pickNameImage = SpecList.find( (spec: ISpecList)=> spec.name === pickName )?.image;

    return (
        <div className='pick'>
            <img alt='' src={pickName ? pickNameImage : EmptyPickBan} className={`pick-icon ${pickName ? 'picked-icon' : 'empty-icon'}`}/>
            <div className='pick-title'>
                <span>Pick</span>
                <img alt='' src={Pick}/>
            </div>
        </div>
    );
}