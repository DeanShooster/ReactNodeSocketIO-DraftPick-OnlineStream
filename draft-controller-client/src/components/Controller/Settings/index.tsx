
import { IPickNBan } from '..';
import { SettingsController } from './SettingsController';

import './index.scss';

interface ISettings{
    pickNban: IPickNBan;
    updateSetting: Function;
}

export const Settings = ({pickNban,updateSetting} : ISettings) => {
    return (
        <section className='settings-container'>
            <h1>Settings</h1>
            <SettingsController pickNban={pickNban} updateSetting={updateSetting}/>
        </section>
    );
}