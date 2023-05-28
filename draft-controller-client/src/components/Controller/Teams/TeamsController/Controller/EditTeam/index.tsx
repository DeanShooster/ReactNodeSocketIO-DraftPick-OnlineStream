import { useState } from 'react';
import { editExistingTeam } from '../../../../../../API/ControllerAPI';
import { errorMsg, localTokenAdminKey, updateMsg } from '../../../../../../constants/General';

import { ModalUpdate } from '../../../../../ModalUpdate';

import './index.scss';

interface IEditTeam{
    teams: any;
    updateSetting: Function;
}

export const EditTeam = ({teams,updateSetting} : IEditTeam) => {

    const [editTeam,setEditTeam] = useState<string>(teams[0].name || '');
    const [inputError,setInputError] = useState<string | null>(null);
    const [modalMsg,setModalMsg] = useState<string | null>(null);

    const teamOptions = [];
    for(let i = 0; i < teams.length; i++) teamOptions.push(<option key={i}>{teams[i].name}</option>)

    async function teamEditionHandler(event: any){
        event.preventDefault();
        const teamEdition = {name: editTeam, newName: event.target.children[1].value , newCode: event.target.children[2].value};
        if(teamEdition.newName.length === 0 && teamEdition.newCode.length === 0){
            setInputError('Empty inputs...');
            return;
        }
        const result = await editExistingTeam(localStorage.getItem(localTokenAdminKey) || '',teamEdition);
        if(result.error){
            setModalMsg(errorMsg);
            return;
        }
        setModalMsg(updateMsg);
        updateSetting();
    }

    return (
        <>
            <div className='edit-team'>
                <h2>Edit Team</h2>
                <form onSubmit={teamEditionHandler}>
                    <div>
                        <label>Select Team:</label>
                        <select onChange={(event: any)=>setEditTeam(event.target.value)}>
                            {teamOptions}
                        </select>
                    </div>
                    <input placeholder='Team Name'/>
                    <input placeholder='Code'/>
                    {inputError && <span>{inputError}</span>}
                    <button>EDIT</button>
                </form>
            </div>
            {modalMsg && <ModalUpdate update={modalMsg} closeModal={setModalMsg}/>}
        </>
    );
}