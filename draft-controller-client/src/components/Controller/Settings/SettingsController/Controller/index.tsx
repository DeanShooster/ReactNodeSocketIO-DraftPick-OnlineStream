import { useState } from 'react';
import { updatePickBan } from '../../../../../API/ControllerAPI';
import { errorMsg, localTokenAdminKey, updateMsg } from '../../../../../constants/General';

import { ModalUpdate } from '../../../../ModalUpdate';

import './index.scss';

interface IController{
    pickRange: {
        min: number;
        max: number;
    };
    banRange: {
        min: number;
        max: number;
    },
    updateSetting: Function;
}

export const Controller = ({pickRange,banRange,updateSetting} : IController) => {

    const [pick,setPick] = useState<number>(pickRange.min);
    const [ban,setBan] = useState<number>(banRange.min);
    const [modalMsg,setModalMsg] = useState<string | null>(null);

    const pickOptions = [], banOptions = [];
    for(let i = pickRange.min; i <= pickRange.max; i++) pickOptions.push(<option key={`pick ${i}`}>{i}</option>);
    for(let i = banRange.min; i <= banRange.max; i++) banOptions.push(<option key={`ban ${i}`}>{i}</option>);

    async function updatePickBanHandler(event: any){
        event.preventDefault();
        const result = await updatePickBan(localStorage.getItem(localTokenAdminKey) || '',{pick,ban});
        if(result.error){
            setModalMsg(errorMsg);
            return;
        }
        setModalMsg(updateMsg);
        updateSetting();
    }

    return (
        <>
            <div className='controller-pick-ban'>
                <h2>Update Pick & Ban</h2>
                <form onSubmit={updatePickBanHandler}>
                    <div>
                        <label>Pick</label>
                        <select onChange={(event: any)=>{setPick(parseInt(event.target.value))}}>
                            {pickOptions}
                        </select>
                    </div>
                    <div>
                        <label>Ban</label>
                        <select onChange={(event: any)=>{setBan(parseInt(event.target.value))}}>
                            {banOptions}
                        </select>
                    </div>
                    <button>Update</button>
                </form>
            </div>
            {modalMsg && <ModalUpdate update={modalMsg} closeModal={setModalMsg}/>}
        </>
    );
}