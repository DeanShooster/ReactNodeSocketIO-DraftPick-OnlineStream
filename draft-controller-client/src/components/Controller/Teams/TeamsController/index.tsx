import { ITeam } from "../..";
import { Controller } from "./Controller";
import { Team } from "./Team";

import './index.scss';

interface ITeamsController{
    teams: ITeam[];
    updateSetting: Function;
}

export const TeamsController = ({teams,updateSetting} : ITeamsController) => {
    return (
        <div className="teams-controller-container">
            <div className="team-list">
                {teams.map((team: ITeam,index: number)=>{
                    return <Team key={index} name={team.name} code={team.code}/>
                })}
            </div>
            <hr></hr>
            <Controller teams={teams} updateSetting={updateSetting}/>
        </div>
    );
}