import { findSpec } from "../../../../utils/findSpec";

import { blackBackground, whiteBackground } from "../../../../Images";

interface ISpecPick{
    left: boolean;
    pick: string | undefined;
}

export const SpecPick = ({left , pick}: ISpecPick) => {

    const specImage = findSpec(pick);
    
    return (
        <div className="spec-pick-wrapper">
            <img alt='' src={left ? whiteBackground : blackBackground} className="wrapper-bg"/>
            {pick && <img alt='' src={specImage} className="spec-pick"/>}
        </div>
    )
}