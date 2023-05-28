import { useState } from 'react';
import { addNewTeam } from '../../../../../../API/ControllerAPI';
import { errorMsg, localTokenAdminKey, updateMsg } from '../../../../../../constants/General';

import { ModalUpdate } from '../../../../../ModalUpdate';

import './index.scss';

interface INewTeam{
    updateSetting: Function;
}

export const NewTeam = ({updateSetting} : INewTeam) => {

    const [inputError,setInputError] = useState<string | null>(null);
    const [modalMsg,setModalMsg] = useState<string | null>(null);

    async function teamAdditionHandler(event: any){
        event.preventDefault();
        const newTeam = {name: event.target.children[0].value, code: event.target.children[1].value};
        if(newTeam.name.length === 0 || newTeam.code.length === 0){
            setInputError('Invalid Input...');
            return;
        }
        const result = await addNewTeam(localStorage.getItem(localTokenAdminKey) || '',newTeam);
        if(result.error){
            setModalMsg(errorMsg);
            return;
        }
        setModalMsg(updateMsg);
        updateSetting();
    }

    return (
        <>
            <div className='new-team'>
                <h2>Add a Team</h2>
                <form onSubmit={teamAdditionHandler}>
                    <input placeholder='Team Name'/>
                    <input placeholder='Code'/>
                    {inputError && <span>{inputError}</span>}
                    <button>ADD</button>
                </form>
            </div>
            {modalMsg && <ModalUpdate update={modalMsg} closeModal={setModalMsg}/>}
        </>
    );
}