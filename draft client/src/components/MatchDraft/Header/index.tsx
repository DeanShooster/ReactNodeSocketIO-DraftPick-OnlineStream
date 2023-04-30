import { VersusLogo } from "./VersusLogo";
import { Team } from "./Team";

import { IMatchDraftObject } from "..";

import './index.scss';

interface IHeader{ matchDraft: IMatchDraftObject | null }

export const Header = ( {matchDraft} : IHeader) => {
    return (
        <header>
            <Team left={true} name={matchDraft?.team1.name}/>
            <VersusLogo />
            <Team left={false} name={matchDraft?.team2.name}/>
        </header>
    );
}