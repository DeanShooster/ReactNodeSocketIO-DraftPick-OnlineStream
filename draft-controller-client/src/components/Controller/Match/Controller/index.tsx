import { useState } from "react";
import { resetMatch } from "../../../../API/ControllerAPI";
import { errorMsg, localTokenAdminKey, updateMsg } from "../../../../constants/General";

import { ITeam } from "../..";
import { NextMatch } from "./NextMatch";
import { SetMatchResults } from "./SetMatchResults";

import './index.scss';
import { ModalUpdate } from "../../../ModalUpdate";

interface IController{
    match: ITeam[];
    teams: ITeam[];
    updateSetting: Function;
}

interface IMatch{
    nextMatch: boolean;
    matchResult: boolean;
}

export const Controller = ({match,teams,updateSetting}:IController) => {

    const [matchConfig,setMatch] = useState<IMatch>({nextMatch: true, matchResult: false});
    const [modalMsg,setModalMsg] = useState<string | null>(null);

    async function resetMatchHandler(){
        const result = await resetMatch(localStorage.getItem(localTokenAdminKey) || '');
        if(result.error){
            setModalMsg(errorMsg);
            return;
        }
        setModalMsg(updateMsg);
        updateSetting();
    }

    const controllerHandler = (id: number) =>{
        switch(id){
            case 1:{ setMatch({nextMatch : true , matchResult: false}); return; }
            case 2:{ setMatch({nextMatch : false , matchResult: true}); return; }
            default: {}
        }
    }

    return (
        <>
            <div className="match-controller">
                <div className="button-container">
                    <button onClick={()=>controllerHandler(1)}>Set Next Match</button>
                    <button onClick={()=>controllerHandler(2)}>Set Match Results</button>
                    <button className="reset-button" onClick={resetMatchHandler}>RESET MATCH</button>
                </div>
                {matchConfig.nextMatch && <NextMatch teams={teams} updateSetting={updateSetting}/>}
                {matchConfig.matchResult && <SetMatchResults teams={match}/>}
            </div>
            {modalMsg && <ModalUpdate update={modalMsg} closeModal={setModalMsg}/>}
        </>
    );
}