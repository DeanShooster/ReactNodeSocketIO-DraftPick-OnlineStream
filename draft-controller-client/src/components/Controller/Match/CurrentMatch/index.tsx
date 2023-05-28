import { ITeam } from "../..";
import { VersusIcon } from "../../../../Images";

import './index.scss';

interface ICurrentMatch{
    match: ITeam[]
}

export const CurrentMatch = ({match}: ICurrentMatch) => {

    const noTeam = '???';

    return (
        <div className="current-match">
            <span>{match[0]?.name || noTeam}</span>
            <img alt='' src={VersusIcon}/>
            <span>{match[1]?.name || noTeam}</span>
        </div>
    );
}