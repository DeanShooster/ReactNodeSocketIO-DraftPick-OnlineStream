import { useState } from "react";

import { ITeam } from "../../..";
import { NewTeam } from "./NewTeam";

import './index.scss';
import { EditTeam } from "./EditTeam";

interface IController{
    teams: ITeam[];
    updateSetting: Function;
}

export const Controller = ({teams,updateSetting}:IController) => {

    const [newTeam,setNewTeam] = useState<boolean>(true);

    return (
        <div className="controller">
            <div className="button-container">
                <button onClick={()=>setNewTeam(true)}>Add a Team</button>
                <button onClick={()=>setNewTeam(false)}>Edit Team</button>
            </div>
            {newTeam ? <NewTeam updateSetting={updateSetting}/> : <EditTeam teams={teams} updateSetting={updateSetting}/>}
        </div>
    );
}