import { findSpec } from "../../../../utils/findSpec";

import { blackBackground, whiteBackground } from "../../../../Images";

interface ISpecPick{
    left: boolean;
    pick: string | undefined;
}

export const SpecPick = ({left , pick}: ISpecPick) => {
    const spec: {name: string , image: any} | undefined = findSpec(pick);
    return (
        <div className={`spec-pick-wrapper ${spec ? 'spec-chosen' : ''}`}>
            <img alt='' src={left ? whiteBackground : blackBackground} className="wrapper-bg"/>
            {(pick && spec) && <img alt='' src={spec.image} className="spec-pick"/>}
            {spec && <div className='spec-name' style={left? {top: '5px' , left: '7px'} : {top: '5px' ,right: '10px'}}>{spec.name}</div>}
        </div>
    )
}