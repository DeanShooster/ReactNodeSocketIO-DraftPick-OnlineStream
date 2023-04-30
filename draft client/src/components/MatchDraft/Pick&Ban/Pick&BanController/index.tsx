
import { pickNBanHandler } from '../../../../API/RaidLeagueAPI';
import { localTokenKey } from '../../../../constants/General';

import './index.scss';

interface IPickNBanController{
    selectedSpec: {
        name: string;
        image: any;
    } | null;
    setSelectedSpec: Function;
}

export const PickNBanController = ({selectedSpec,setSelectedSpec} : IPickNBanController) => {

    async function pickBanControllerHandler(){
        if(selectedSpec) await pickNBanHandler(localStorage.getItem(localTokenKey) , {spec: selectedSpec.name});
        setSelectedSpec(null);
    }

    return (
        <footer>
            <button className='button-container' onClick={pickBanControllerHandler}>
                <img alt={selectedSpec?.name} src={selectedSpec?.image}/>
                <span>Lock</span>
            </button>
        </footer>
    );
}